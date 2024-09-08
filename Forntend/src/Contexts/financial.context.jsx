import { createContext, useContext, useEffect, useState } from "react";
import FinancialService from "../services/Financia.service";
import { useUser } from "@clerk/clerk-react";


export const FinancialRecordContext = createContext();
export const FinancialRecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();
  const fetchRecords = async () => {
    if (!user) return;
    try {
      const response = await FinancialService.getFinanciaByUserId(user.id);
      if (response.status === 200) {
        setRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [user]);


  //Add Record to FinancialRecord
  const addRecord = async (record) => {
    try {
      const response = await FinancialService.insertFinancia(record);
      if (response.status === 200) {
        setRecords((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Get a record by id
  const getRecordById = async (id) => {
    // Try to find the record in the current state
    const existingRecord = records.find((record) => record.id === id);
    if (existingRecord) return existingRecord;

    // If not found, fetch from API
    try {
      const response = await FinancialService.getFinanciaById(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null; // Return null if not found
  };


  //Edit Record in FinancialRecord
  const updateRecord = async (id, newRecord) => {
    try {
      const response = await FinancialService.editFinancia(id, newRecord);
      if (response.status === 200) {
        setRecords((prev) => {
          prev.map((record) => {
            if (record.id === id) {
              return newRecord;
            } else {
              return record;
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Delete Record in FinancialRecord
  const deleteRecord = async (id) => {
    try {
      const response = await FinancialService.deleteFinancia(id);
      if (response.status === 200) {
        setRecords((prev) => prev.filter((record) => record.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord, getRecordById}}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => useContext(FinancialRecordContext);
