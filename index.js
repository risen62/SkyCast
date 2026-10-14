import express from "express"
import axios from "axios"

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");

});
app.get("/weather",async(req,res)=>{
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    try{
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
        var temperature = response.data.current.temperature_2m;
        var unit = response.data.current_units.temperature_2m;
        res.json({
            temperature,
            unit
        })


    }catch(error){
        console.log(error.message);
        res.status(500).send("API Failed");

    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})