import multer,{diskStorage, memoryStorage} from "multer"

export const upload = ()=> {
    const filterImage = ['image/png','image/jpg','image/jpeg']
    const fileFilter = (req,file,cb)=>{
        if(!filterImage.includes(file.mimetype)) return cb(new Error("Invalid file format"),false);
        return cb(null,true);
    }
    return multer({storage:diskStorage({}),fileFilter})
}

export const uploadMemory = ()=> {
    const filterImage = ['image/png','image/jpg','image/jpeg']
    const fileFilter = (req,file,cb)=>{
        if(!filterImage.includes(file.mimetype)) return cb(new Error("Invalid file format"),false)
        return cb(null, true)
    }
    const storage = memoryStorage()
    return multer({storage,fileFilter})
}