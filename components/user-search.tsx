"use client"

import { useState, useEffect, useRef } from "react"
import type { User } from "@/lib/types"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserSearchProps {
  users: User[]
  onSelectUser: (user: User) => void
}

export default function UserSearch({ users, onSelectUser }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const commandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter((user) => user.name.first.toLowerCase().includes(query))
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleUserClick = (user: User) => {
    onSelectUser(user)
    setIsOpen(false)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="relative" ref={commandRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search users by first name..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="border-none focus:ring-0"
        />

        {isOpen && (
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No users found</CommandEmpty>
            <CommandGroup>
              {filteredUsers.slice(0, 100).map((user) => (
                <CommandItem
                  key={`${user.login.uuid}`}
                  onSelect={() => handleUserClick(user)}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.picture.thumbnail || "/placeholder.svg"}
                      alt={`${user.name.first} ${user.name.last}`}
                    />
                    <AvatarFallback>{getInitials(user.name.first, user.name.last)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {user.name.first} {user.name.last}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  )
}
