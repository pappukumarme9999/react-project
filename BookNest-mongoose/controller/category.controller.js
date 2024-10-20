import { request, response } from "express";
import { Category } from "../model/category.model.js";

export const addCategory = async (request, response, next) => {
    try {
        for (let category of request.body) {
            await Category.create({ categoryName: category });
        }
        return response.status(200).json({ msg: "Add Category Succesfully", status: true });

    } catch (err) {
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    }
}


export const list = (request, response, next) => {
   
    Category.find().then(result => {
        return response.status(200).json({ category: result, msg: "category List", status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false })
    })
}

export const removeCategory = async (request, response, next) => {
       
        Category.findByIdAndRemove(request.body.categoryId)
        .then(result => {
            return response.status(200).json({ message: "Category removed", status: true ,result});
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", status: false });
      })
}




export const editCategory = async (request, response, next) => {
   
    try {
        let updateCategory = await Category.findById(request.body.id)
        if(updateCategory){
            updateCategory.categoryName= request.body.categoryName||updateCategory.categoryName
         const category=await  updateCategory.save();
       return response.status(200).json({result:category,message : "Category update succesfully"})
        } 
    } catch (err) {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }
}


 



export const addMoreCategory =(request,response,next)=>{
    Category.create({categoryName : request.body.categoryName}).then(result=>{
        return response.status(200).json({category:result,msg:"Category Added SuccesFully",status:true});
    }).catch(err=>{
        return response.status(500).json({msg:"Internal Server Error",status:false});
    })
}


