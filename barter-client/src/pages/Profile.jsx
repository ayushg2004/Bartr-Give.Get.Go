import ProfileForm from "@/components/Profile/ProfileForm"
import ProfilePicture from "@/components/Profile/ProfilePicture"
import ChangePassword from "@/components/Profile/ChangePassword"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

const ProfilePage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
            <p className="text-muted-foreground">Manage your profile information and account settings</p>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Picture */}
            <div className="md:col-span-1">
              <ProfilePicture />
            </div>

            {/* Profile Form */}
            <div className="md:col-span-2">
              <ProfileForm />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Change Password Section */}
          <div>
            <ChangePassword />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage

