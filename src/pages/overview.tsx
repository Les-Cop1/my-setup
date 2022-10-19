import React, { useEffect, useState } from 'react'

import { getRoomStats } from '@api'
import { Card, PageHeader } from '@components'

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

  document.title = t('Overview')

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
          console.error('Could not retrieve stats')
        }
      })
      .catch(() => {
        console.error('Could not retrieve stats')
      })
  }

  useEffect(() => {
    getStats()
  }, [])

  return (
    <>
      <PageHeader title={t('Overview')} />

      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">{t('Total')}</p>
          <p className="text-lg font-medium text-gray-900 mb-0">
            {t('Money', {
              val: typeof statsGlobal?.total_price === 'number' ? statsGlobal?.total_price : 0,
            })}
          </p>
        </Card>
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">{t('Average')}</p>
          <p className="text-lg font-medium text-gray-900 mb-0">
            {t('Money', {
              val: typeof statsGlobal?.average_price === 'number' ? statsGlobal?.average_price : 0,
            })}
          </p>
        </Card>
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">
            {t('Room', { count: statsGlobal?.rooms_count })}
          </p>
          <p className="text-lg font-medium text-gray-900 mb-0">{statsGlobal?.rooms_count}</p>
        </Card>
        <Card>
          <p className="truncate text-sm font-medium text-gray-500 mb-0">
            {t('Item', { count: statsGlobal?.rooms_count })}
          </p>
          <p className="text-lg font-medium text-gray-900 mb-0">{statsGlobal?.items_count}</p>
        </Card>
      </div>

      <div className="bg-zinc-50 flex gap-5 p-4 items-center flex-col lg:flex-row">
        <Card className="w-full lg:w-1/3 sm:h-auto">
          <Doughnut options={optionsDoughnut} data={dataDoughnutChart} className="max-h-60" />
        </Card>
        <Card className="w-full lg:w-2/3 lg:h-auto">
          <Bar options={optionsBar} data={dataBarChart} className="max-h-60" />
        </Card>
      </div>
    </>
  )
}
