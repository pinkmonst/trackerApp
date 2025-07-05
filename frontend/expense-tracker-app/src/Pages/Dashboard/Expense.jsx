import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/Dashboardlayout';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';
import { API_PATHS } from '../../utils/apiPaths';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/layouts/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import expenseGif from '../../assets/Gif/expense.gif'; 
import piggyGif from '../../assets/Gif/piggy.gif';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const [note, setNote] = useState("");
  const [showPiggyAnimation, setShowPiggyAnimation] = useState(false); 

  useEffect(() => {
    const savedNote = localStorage.getItem("expense_note");
    if (savedNote) setNote(savedNote);
  }, []);

  useEffect(() => {
    localStorage.setItem("expense_note", note);
  }, [note]);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");

     
      setShowPiggyAnimation(true);
      setTimeout(() => setShowPiggyAnimation(false), 2500);

      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      toast.error("Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
      toast.error("Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">


        {/* Note Taker */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 shadow-sm mb-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-pink-800 mb-2">📝 Personal Note</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your thoughts, reminders, or expense notes here..."
            rows={3}
            className="w-full p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
          />
          {note.trim() && (
            <div className="mt-4 p-3 bg-white border rounded-lg text-gray-700">
              <p className="text-sm font-medium text-pink-600 mb-1">💾 Saved Note:</p>
              <p className="whitespace-pre-wrap">{note}</p>
            </div>
          )}
        </div>

       
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-[234px]">
            <img 
              src={expenseGif} 
              alt="Expense animation" 
              className="w-full h-auto rounded-lg"
              style={{ 
                mixBlendMode: 'multiply',
                backgroundColor: 'transparent',
                opacity: 0.9
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent rounded-lg"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownload={handleDownloadExpenseDetails}
        />

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
