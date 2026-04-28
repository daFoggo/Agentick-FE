import { useState, useMemo } from "react"
import { Loader2, UserPlus, Mail } from "lucide-react"
import { toast } from "sonner"
import { useTeamMemberMutations } from "../queries"
import type { TTeamRole } from "../schemas"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ASSIGNABLE_ROLES } from "@/constants/team-roles"

interface IInviteTeamMemberDialogProps {
  teamId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const InviteTeamMemberDialog = ({
  teamId,
  open,
  onOpenChange,
}: IInviteTeamMemberDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [selectedRole, setSelectedRole] = useState<TTeamRole>("member")

  const anchor = useComboboxAnchor()
  const { generateInvite } = useTeamMemberMutations()

  const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidEmail = isEmail(searchQuery)

  const items = useMemo(() => {
    if (isValidEmail) {
      return [searchQuery]
    }
    return []
  }, [searchQuery, isValidEmail])

  const handleAdd = async () => {
    if (selectedEmails.length === 0) return

    try {
      await Promise.all(
        selectedEmails.map((email) =>
          generateInvite.mutateAsync({
            teamId,
            payload: { email, role: selectedRole },
          })
        )
      )

      toast.success(`Sent ${selectedEmails.length} invitations.`)
      handleReset()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to send invitations")
    }
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedEmails([])
    setSelectedRole("member")
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleReset()
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:min-w-md">
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>
            Search by name or email to find and invite a member to your team.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Invite by email</FieldLabel>
            <Combobox
              multiple
              autoHighlight
              items={items}
              itemToStringValue={(item) => item}
              value={selectedEmails}
              onValueChange={(vals) => {
                setSelectedEmails(vals as string[])
              }}
              onInputValueChange={setSearchQuery}
            >
              <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                  {(values: string[]) => (
                    <>
                      {values.map((email) => (
                        <ComboboxChip key={email}>{email}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput
                        placeholder="Type email and press enter..."
                        autoComplete="off"
                      />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>
                  {searchQuery && !isValidEmail ? "User not found or invalid email" : "Type an email to invite"}
                </ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      <Mail className="mr-2 size-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Invite {item}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          From email
                        </span>
                      </div>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field>
            <FieldLabel>Role</FieldLabel>
            <Select
              value={selectedRole}
              onValueChange={(val) => setSelectedRole(val as TTeamRole)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="p-1">
                {ASSIGNABLE_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex items-center gap-2">
                      <role.icon className="size-3.5" />
                      {role.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={generateInvite.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={selectedEmails.length === 0 || generateInvite.isPending}
          >
            {generateInvite.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <UserPlus className="size-4" />
                <span>Invite Member</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
