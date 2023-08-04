
const checkRelease_Year = (req, res, next) => {
    if (typeof req.body.release_year !== "number" || req.body.release_year.length < 4 || req.body.release_year > 4 ) 
        res.status(400).json({error:"Invalid release year."});
    else 
        next();
}

const checkPrice = (req, res, next) => {
    if (!typeof req.body.price !== "number") 
        res.status(400).json({error:"Invalid price."})
    else 
      next();

}

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
const checkArt = (req, res, next) => {
    if (!isValidUrl(req.body.art))
        res.status(400).json({error:"Invalid art URL."})
    else 
        next()
}

module.exports = {checkRelease_Year, checkPrice, checkArt}