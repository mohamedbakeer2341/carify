import multer,{diskStorage} from "multer"

export const upload = (filterArr)=>{
    const filterImage = ['image/png','image/jpg','image/jpeg']
    const fileFilter = (req,file,cb)=>{
        if(!filterImage.includes(file.mimetype)) return cb(new Error("Invalid file format"),false);
        return cb(null,true);
    }
    return multer({storage:diskStorage({}),fileFilter})
}