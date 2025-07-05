const xlsx= require ('xlsx');
const Expense=require("../models/Expense");


// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId, 
            icon, 
            category, 
            amount, 
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get All Expense Sources
exports.getAllExpense= async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ 
            message: "Server Error",
            error: error.message 
        });
    }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });

  } catch (error) {
    return res.status(500).json({ 
      message: "Server Error",
      error: error.message
    });
  }
};




// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
        
       
};