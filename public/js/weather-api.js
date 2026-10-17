// Open-Meteo supports browser requests; avoid sharing Render's outbound quota.
window.weatherApi = (() => {
  const cache = new Map();
  const pending = new Map();

  async function request(url) {
    const cached = cache.get(url);
    if (cached && cached.expires > Date.now()) return cached.data;
    if (pending.has(url)) return pending.get(url);

    const task = (async () => {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) {
        throw new Error(response.status === 429
          ? "Weather service is busy. Please try again later."
          : "Unable to fetch weather. Please try again.");
      }
      const data = await response.json();
      if (data.error) throw new Error("Unable to fetch weather. Please try again.");
      if (cache.size >= 100) cache.delete(cache.keys().next().value);
      cache.set(url, { data, expires: Date.now() + 5 * 60 * 1000 });
      return data;
    })();
    pending.set(url, task);
    try {
      return await task;
    } finally {
      pending.delete(url);
    }
  }

  return {
    async weather(latitude, longitude) {
      const params = new URLSearchParams({ latitude, longitude, current: "temperature_2m" });
      const data = await request(`https://api.open-meteo.com/v1/forecast?${params}`);
      const temperature = data.current?.temperature_2m;
      const unit = data.current_units?.temperature_2m;
      if (!Number.isFinite(temperature) || typeof unit !== "string") {
        throw new Error("Weather data is unavailable. Please try again later.");
      }
      return { temperature, unit };
    },
    async city(name) {
      const params = new URLSearchParams({ name, count: "1", language: "en", format: "json" });
      const data = await request(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
      if (!data.results?.length) throw new Error("City not found. Please check the name.");
      return data.results[0];
    },
  };
})();
