import { useCallback } from "react"
import { useState } from "react"

const API_URL = "http://localhost:5003/api"

export const useTransactions = (userId)=>{
  const [transactions,setTransaction] = useState([])
  const [summary,setSummary] = useState({
    balance:0,
    income:0,
    expenses:0
  })
  const [isLoading,setIsLoading] = useState(true)
  const fetchTransactions = useCallback(async ()=>{
    try {
        const response = await fetch(`${API_URL}/transactions/${userId}`)
        const data = await response.json()
        setTransaction(data)
    } catch (error) {
        console.log(error)
    }
  },[userId])
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);
  const loadData = useCallback(async()=>{
    if(!userId){
        return
    }
    setIsLoading(true)
    try {
        await Promise.all([fetchTransactions(),fetchSummary()])
        //await fetchTransactions();
        //await fetchSummary()
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
  },[fetchSummary,fetchTransactions,userId]) 
  const deleteTransaction = async (id) =>{
    try {
        const response = await fetch(`${API_URL}/transactions/${id}`,{method:"DELETE"})
        if(!response.ok){
            throw new Error("failed to delete")
        }
        loadData()
        Alert.alert("Success deleted ")
    } catch (error) {
        console.log(error)
    }
  }
  return {transactions,isLoading,summary,deleteTransaction,loadData}
}