import React, { useEffect, useState } from 'react'

import { getRoomStats } from '@api'
import { PageHeader } from '@components'

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

export type StatsGlobal = {
  total_price: number
  average_price: number
  rooms_count: number
  items_count: number
  most_expensive_room?: {
    name: string
  }
}

type StatsRooms = {
  room_price: number
  name: string
}

type StatsYears = {
  year: string
  value: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement)

export const Overview: React.FC = () => {
  const { t } = useTranslation()
  const [statsGlobal, setStatsGlobal] = useState<StatsGlobal>()
  const [statsRooms, setStatsRooms] = useState<StatsRooms[]>([])
  const [statsYears, setStatsYears] = useState<StatsYears[]>([])

  const optionsBar = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('Expenses by year'),
      },
    },
  }

  const dataBarChart = {
    labels: statsYears.map((item: StatsYears) => item.year),
    datasets: [
      {
        data: statsYears.map((item: StatsYears) => item.value),
        backgroundColor: '#0d9488',
      },
    ],
  }

  const optionsDoughnut = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('Room distribution'),
      },
    },
  }

  const dataDoughnutChart = {
    labels: statsRooms.map((item: StatsRooms) => item.name),
    datasets: [
      {
        data: statsRooms.map((item: StatsRooms) => item.room_price),
        backgroundColor: ['#134e4a', '#115e59', '#0f766e', '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'],
      },
    ],
  }

  const getStats = () => {
    getRoomStats()
      .then((response) => {
        if (response.success && response.data) {
          const {
            stats: { global, rooms, years },
          } = response.data
          setStatsGlobal(global)

          const tmpStatsRooms = Object.values(rooms).map((room) => ({
            name: room.name,
            room_price: room.room_price ? room.room_price : 0,
          }))
          setStatsRooms(tmpStatsRooms)

          const tmpStatsYears = Object.entries(years).map(([year, value]) => ({ year, value }))
          setStatsYears(tmpStatsYears)
        } else {
          console.log('error', 'Could not retrieve stats', response.error)
        }
      })
      .catch((error) => {
        console.log('error', 'Could not retrieve stats', error)
      })
  }

  useEffect(() => {
    getStats()
  }, [])

  return (
    <>
      <PageHeader title={t('Overview')} />

      <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:gap-2 xl:grid-cols-5 sm:gap-8">
        <div className="flex flex-col">
          <dd className="order-1 mt-2 text-lg font-medium leading-6 text-teal-600">{t('Total')}</dd>
          <dt className="order-2 text-4xl font-bold tracking-tight">
            {t('Money', { val: typeof statsGlobal?.total_price === 'number' ? statsGlobal?.total_price : 0 })}
          </dt>
        </div>
        <div className="mt-10 flex flex-col sm:mt-0">
          <dd className="order-1 mt-2 text-lg font-medium leading-6 text-teal-600">{t('Average')}</dd>
          <dt className="order-2 text-4xl font-bold tracking-tight">
            {t('Money', { val: typeof statsGlobal?.average_price === 'number' ? statsGlobal?.average_price : 0 })}
          </dt>
        </div>
        <div className="mt-10 flex flex-col sm:mt-0">
          <dd className="order-1 mt-2 text-lg font-medium leading-6 text-teal-600">{t('Rooms')}</dd>
          <dt className="order-2 text-4xl font-bold tracking-tight">{statsGlobal?.rooms_count}</dt>
        </div>
        <div className="mt-10 flex flex-col sm:mt-0">
          <dd className="order-1 mt-2 text-lg font-medium leading-6 text-teal-600">{t('Items')}</dd>
          <dt className="order-2 text-4xl font-bold tracking-tight">{statsGlobal?.items_count}</dt>
        </div>
        <div className="mt-10 flex flex-col sm:mt-0">
          <dd className="order-1 mt-2 text-lg font-medium leading-6 text-teal-600">{t('Most expensive room')}</dd>
          <dt className="order-2 text-4xl font-bold tracking-tight">{statsGlobal?.most_expensive_room?.name}</dt>
        </div>
      </dl>
      <div className="bg-zinc-50 flex gap-2 p-3 items-center flex-col lg:flex-row">
        <div className="w-1/3 h-auto bg-white">
          <Doughnut options={optionsDoughnut} data={dataDoughnutChart} />
        </div>
        <div className="w-2/3 h-auto bg-white">
          <Bar options={optionsBar} data={dataBarChart} />
        </div>
      </div>
    </>
  )
}
