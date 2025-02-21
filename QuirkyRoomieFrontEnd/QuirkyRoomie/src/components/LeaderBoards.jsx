import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
    const navigate = useNavigate();
    const [leaderboardData, setLeaderboardData] = useState([]);

    function opencomplaints(){
        navigate('/complaints')
    }

    // Sample leaderboard data
    useEffect(() => {
        // Fetch leaderboard data (you would typically get this from an API)
        setLeaderboardData([
            { rank: 1, name: 'Alice', karmaPoints: 150 },
            { rank: 2, name: 'Bob', karmaPoints: 120 },
            { rank: 3, name: 'Charlie', karmaPoints: 100 },
            { rank: 4, name: 'David', karmaPoints: 80 },
            { rank: 5, name: 'Eve', karmaPoints: 60 },
        ]);
    }, []);

    return (
        <div className="w-full h-screen bg-zinc-900 flex justify-center items-center">
            <div className="w-full md:w-3/4 lg:w-1/2 p-7 rounded-2xl flex flex-col gap-4 shadow-xl shadow-zinc-600">
                <h1 className="text-center text-4xl text-white">Leaderboard</h1>
                <div className="text-lg text-center mb-6 cursor-pointer text-blue-500 font-semibold" onClick={opencomplaints}>Go Back to Home</div>
                <div className="bg-zinc-700 rounded-lg p-5">
                    <table className="w-full text-white">
                        <thead>
                            <tr>
                                <th className="text-2xl py-2">Rank</th>
                                <th className="text-2xl py-2">Name</th>
                                <th className="text-2xl py-2">Karma Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((player) => (
                                <tr key={player.rank} className="border-t border-zinc-600">
                                    <td className="py-2 text-xl text-center">{player.rank}</td>
                                    <td className="py-2 text-xl">{player.name}</td>
                                    <td className="py-2 text-xl text-center">{player.karmaPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LeaderBoard;
