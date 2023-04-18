import { useGetUsersQuery } from '@/slices/api/apiSlice'
import React from 'react'
import DeleteDialogue from './DeleteDialogue'
import { useAddBalanceMutation } from '@/slices/api/balanceApi'
import AlertSuccess from '../../../../../../components/Alert/AlertSuccess'
import Loading from '../../../../../../components/Loading'

const AllUsersCard = () => {
  const { data } = useGetUsersQuery()
  const [addBalance, { isSuccess, isLoading }] = useAddBalanceMutation()
  const [agree, setAgree] = React.useState(false)
  // console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const amount = form.amount.value
    const memberName = form.name.value
    const id = form.id.value
    const data = {
      amount,
      memberName,
      id
    }
    console.log(data)
    addBalance(data)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-7'>
      {isSuccess && <AlertSuccess message={'Money Added'} setOpen={true} />}
      {data?.map((user) => (
        <div
          key={user._id}
          className='card card-compact w-[360px] bg-base-100 shadow-2xl p-2'>
          <div className='card-body'>
            <div className='flex justify-between'>
              <img src={user.image} alt='profile' />
              <DeleteDialogue
                id={user._id}
                agree={agree}
                setAgree={setAgree}></DeleteDialogue>
            </div>
            <h2 className='text-start text-lg'>{user.name}</h2>
            <p>{user.address}</p>
            <form onSubmit={handleSubmit} className='flex justify-between mt-3'>
              <input
                type='number'
                placeholder='amount'
                name='amount'
                className='input input-bordered'
              />
              <input
                readOnly
                hidden
                type='text'
                name='name'
                value={user.name}
              />
              <input readOnly hidden type='text' name='id' value={user._id} />
              <button type='submit' className='btn btn-info btn-outline'>
                add
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllUsersCard
