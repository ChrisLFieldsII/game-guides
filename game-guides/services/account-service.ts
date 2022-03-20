import { ddbUtils } from '~/utils'

interface IAccountService {
  getAccount: (input: GetItemInput) => Promise<Nullable<Account>>
  updateAccount: (input: UpdateAccountInput) => Promise<Account>
}

class AccountService implements IAccountService {
  private mapper: Mapper<Account, Promise<Account>> = async (from) => {
    return {
      ...from,
    }
  }

  getAccount = async (input: GetItemInput) => {
    return ddbUtils.getItemById({
      id: input.id,
      mapper: this.mapper,
    })
  }

  updateAccount = async (input: UpdateAccountInput) => {
    const { id } = input

    return ddbUtils.updateItemById({
      updateParams: input,
      getKey: () => ({
        pk: `USER#${id}`,
        sk: `USER#${id}`,
      }),
      mapper: this.mapper,
    })
  }
}

export const accountService = new AccountService()
