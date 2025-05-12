import type { User } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, UserIcon } from "lucide-react"

interface UserDetailsProps {
  user: User
}

export default function UserDetails({ user }: UserDetailsProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 flex flex-col items-center p-6">
        <div className="mb-4">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src={user.picture.large || "/placeholder.svg"} alt={`${user.name.first} ${user.name.last}`} />
            <AvatarFallback className="text-xl">{getInitials(user.name.first, user.name.last)}</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-2xl font-bold text-white">
          {user.name.first} {user.name.last}
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserIcon className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{user.gender}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">{user.location.country}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
