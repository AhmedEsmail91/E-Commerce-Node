export default function truncate (model){
    return async (req, res) => {
        await model.deleteMany();
        res.status(200).json({ message: "success" });
    };
    }