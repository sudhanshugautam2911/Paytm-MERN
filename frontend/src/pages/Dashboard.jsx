import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://paytm-mern-virid.vercel.app/api/v1/account/balance", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setBalance(parseFloat(response.data.balance).toFixed(2));
        } catch (error) {
            setError('Failed to fetch balance');
            console.error('Error fetching balance:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBalance();
    }, [])

    return <div>
        <Appbar />
        <div className="m-8">
            {balance != null ? <Balance value={balance} /> : 'Loading...'  }
            <Users />
        </div>
    </div>
}