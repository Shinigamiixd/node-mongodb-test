require("dotenv").config()
const mongo = require("mongoose")

mongo.set('strictQuery', false)
mongo.connect(process.env.MONGO_KEY)
    .then(() => console.log("Connected to MongoDB."))
    .catch(error => console.error("Could not connect to MongoDB...", error))

const courseScheme = new mongo.Schema({
    name: String,
    tags: [String],
    author: String,
    price: Number
})

const Course = mongo.model("Course", courseScheme)

const writeData = async () => {
    const course = new Course({
        name: "how to asdasdasd",
        tags: ["1", "2"],
        author: "KalnasProductions",
        price: 30
    })
    
    const result = await course.save()
    console.log(result)
}

// writeData()


const getData = async () => {
    const courses = await Course.find()
    console.log(courses)
}

// getData()


const getFilteredData = async (author) => {
    const courses = await Course
    .find({author: author})
    // .limit(2)
    // .sort({name: 1})
    // .select({author: 1, name: 1, tags: 1})
    console.log(courses)
}

// getFilteredData({$regex : "^" + "K"})


const countData = async () => {
    const courses = await Course
    .find()
    .count()
    console.log(courses)
}

// countData()


const updateData = async (id) => {
    const course = await Course.findById(id)
    if (!course) return
    course.author = "Kaziukas Kietas"

    const result = await course.save()
    console.log(result)
}

// updateData("63e20c365e61c2267076114f")


const deleteData = async (id) =>{
    const course = await Course.findByIdAndRemove(id)
    console.log(course)
}

// deleteData("63e204d1c4150a1d127abe11")