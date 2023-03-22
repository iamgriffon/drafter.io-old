import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {

  const {data} = trpc.hello.useQuery({msg: ''})

  return (
    <div>
      <h1>Drafter.io</h1>
      <p>{data?.toString()}</p>
    </div>
  )
}

export default Home
