"use client"

import { useState, useEffect } from "react"
import UserSearch from "@/components/user-search"
import UserDetails from "@/components/user-details"
import type { User } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://randomuser.me/api/?results=100")

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await response.json()
        setUsers(data.results)
      } catch (err) {
        setError("Error fetching users. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Random User Directory</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading users...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Search Users</h2>
            <UserSearch users={users} onSelectUser={handleUserSelect} />
            <p className="mt-2 text-sm text-gray-500">{users.length} users loaded. Search by first name.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            {selectedUser ? (
              <UserDetails user={selectedUser} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 border border-dashed border-gray-300">
                Select a user to view their details
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
