const cloudinary = require('cloudinary').v2;
const multer = require('multer');
cloudinary.config({
  cloud_name: 'di6baswzt',
  api_key: '317938433555512',
  api_secret: 'wCRz21HDa7K3agECBJn_uplZc-k'
});

const upload = multer({ dest: 'uploads/' });

function uploadImage(req, res, next) {
    // console.log(req.body);
        if (!req.body.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }
  
    cloudinary.uploader.upload(req.body.image, function(error, result) {
      if (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return res.status(500).json({ error: 'Error uploading image' });
      } else {
        req.imageUrl = result.url;
        next();
      }
    });
  }

module.exports = {uploadImage ,upload};
