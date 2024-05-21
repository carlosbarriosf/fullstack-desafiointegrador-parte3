import { validationResult } from "express-validator";
import fs from "fs"
import path from "path";


export const validationErrorResponse = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorList = errors
            .array()
            .map( err => ({[err.path]: err.msg}))

        
        const directoryPath = './temp/imgs';

        try {
            const files = fs.readdirSync(directoryPath);
    
            files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.png') {
                try {
                fs.unlinkSync(path.join(directoryPath, file));
                console.log(`Deleted file: ${file}`);
                } catch (err) {
                console.log(`Error deleting file: ${file}`);
                }
            }
            });
        } catch (err) {
            console.log(`Unable to scan directory: ${err}`);
        }  
            
    return res.status(400).json({
        ok: false,
        errors: errorList
    })
    } else {
        next()
    }
}
