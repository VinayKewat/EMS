const mongoose = require('mongoose');

// building schema for every config 
const employeSchama = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    toReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employe'
    }],
    hadReviewed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employe'
    }],
    myReview:[{
        reviewedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Employe'
        },
        reviewScore:{
            type:Number,
            required:true,
        }
    }]
});

// schema model
const Employe = mongoose.model('Employe',employeSchama);

// export for call from  index
module.exports = Employe;