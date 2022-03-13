import { ddbUtils } from '~/utils'

interface IAccountService {
  getAccount: (input: GetItemInput) => Promise<Nullable<Account>>
  updateAccount: (input: UpdateAccountInput) => Promise<Account>
}

class AccountService implements IAccountService {
  getAccount = async (input: GetItemInput) => {
    const account = await ddbUtils.getItemById<Account>(input)
    return account
  }

  updateAccount = async (input: UpdateAccountInput) => {
    const { id } = input

    const account = await ddbUtils.updateItemById<Account>({
      updateParams: input,
      getKey: () => ({
        pk: `USER#${id}`,
        sk: `USER#${id}`,
      }),
    })

    return account
  }
}

export const accountService = new AccountService()
