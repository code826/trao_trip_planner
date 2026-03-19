import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts'
import {
  Building2,
  Utensils,
  Ticket,
  Car,
  ShoppingBag,
  Package,
  Film,
  Map,
  Plane,
  Hotel,
  DollarSign
} from 'lucide-react'

// Extended color palette
const COLOR_PALETTE = [
  '#C45D3E', // Terracotta
  '#7D8B75', // Sage
  '#F5A86C', // Sand
  '#8FB9C8', // Sky
  '#E8B4BC', // Rose
  '#9286C3', // Lavender
  '#749A91', // Teal
  '#60A5FA', // Blue
  '#FACC15', // Yellow
  '#FB923C', // Orange
  '#6366F1', // Indigo
  '#EC4899', // Pink
]

const CATEGORY_COLOR_MAP = {
  'accommodation': '#C45D3E',
  'food': '#7D8B75',
  'activities': '#F5A86C',
  'transport': '#8FB9C8',
  'transportation': '#8FB9C8',
  'shopping': '#E8B4BC',
  'entertainment': '#9286C3',
  'sightseeing': '#749A91',
  'flights': '#60A5FA',
  'hotels': '#C45D3E',
}

const getCategoryColor = (name, index) => {
  const normalized = name.toLowerCase()
  if (CATEGORY_COLOR_MAP[normalized]) return CATEGORY_COLOR_MAP[normalized]
  return COLOR_PALETTE[index % COLOR_PALETTE.length]
}

const CATEGORY_ICONS = {
  'Accommodation': Building2,
  'Food': Utensils,
  'Activities': Ticket,
  'Transport': Car,
  'Transportation': Car,
  'Shopping': ShoppingBag,
  'Miscellaneous': Package,
  'Other': Package,
  'Entertainment': Film,
  'Sightseeing': Map,
  'Flights': Plane,
  'Hotels': Hotel,
}

// Helper to wrap text into multiple lines
const renderWrappedText = (text, cx, cy, maxChars = 12) => {
  if (!text) return null

  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  words.forEach(word => {
    if ((currentLine + word).length > maxChars && currentLine !== '') {
      lines.push(currentLine.trim())
      currentLine = word + ' '
    } else {
      currentLine += word + ' '
    }
  })
  lines.push(currentLine.trim())

  return lines.map((line, i) => (
    <text
      key={i}
      x={cx}
      y={cy}
      dy={lines.length === 1 ? 8 : (i - (lines.length - 1) / 2) * 20 + 8}
      textAnchor="middle"
      fill="#2D2A26"
      className="font-bold text-lg"
    >
      {line}
    </text>
  ))
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, currencySymbol } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      {renderWrappedText(payload.name, cx, cy)}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#C45D3E" className="font-bold">
        {`${currencySymbol}${value.toLocaleString()}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#9CA3AF" fontSize={12}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const BudgetChart = ({ budget, selectedCurrency = 'USD', convertCurrency, currencySymbol = '$', days = 1 }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const data = budget.breakdown.map((item) => ({
    name: item.category,
    value: convertCurrency ? convertCurrency(item.estimatedCost) : item.estimatedCost,
  }))

  const totalBudget = convertCurrency ? convertCurrency(budget.totalEstimatedCost) : budget.totalEstimatedCost

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <div className="space-y-8">
      {/* Chart */}
      <div className="h-[400px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={(props) => renderActiveShape({ ...props, currencySymbol })}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getCategoryColor(entry.name, index)}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  stroke={activeIndex === index ? '#fff' : 'none'}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown List */}
      <div className="space-y-4">
        <h4 className="text-xl font-serif font-bold text-charcoal mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-terracotta" />
          Detailed Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budget.breakdown.map((item, index) => {
            const convertedValue = convertCurrency ? convertCurrency(item.estimatedCost) : item.estimatedCost
            const Icon = CATEGORY_ICONS[item.category] || Package
            const isActive = activeIndex === index
            const categoryColor = getCategoryColor(item.category, index)

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border-2 ${isActive
                  ? 'bg-white border-terracotta shadow-lg scale-[1.02]'
                  : 'bg-cream border-transparent hover:bg-creamDark'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-terracotta text-white' : 'bg-white'
                      }`}
                    style={{
                      color: isActive ? undefined : categoryColor,
                      backgroundColor: isActive ? categoryColor : undefined
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className={`font-bold transition-colors ${isActive ? 'text-charcoal' : 'text-charcoal/80'}`}>
                      {item.category}
                    </h5>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-charcoal/40">
                        {((item.estimatedCost / budget.totalEstimatedCost) * 100).toFixed(1)}% of total
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-charcoal">
                    {currencySymbol}{convertedValue.toLocaleString()}
                  </p>
                  {selectedCurrency !== 'USD' && (
                    <p className="text-xs text-charcoal/40">
                      ${item.estimatedCost.toLocaleString()} USD
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Total Card */}
      <div className="bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-sage/10 rounded-full blur-2xl -ml-12 -mb-12"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/60 font-medium mb-2 uppercase tracking-wider text-sm text-center md:text-left">Total Estimated Cost</p>
            <h2 className="text-4xl md:text-5xl font-bold whitespace-nowrap text-center md:text-left flex items-baseline justify-center md:justify-start gap-2">
              <span>{currencySymbol}{totalBudget.toLocaleString()}</span>
              {selectedCurrency !== 'USD' && (
                <span className="text-lg font-normal text-white/40 lowercase">
                  (≈ ${budget.totalEstimatedCost.toLocaleString()} USD)
                </span>
              )}
            </h2>
          </div>

          <div className="h-px w-full md:h-16 md:w-px bg-white/10"></div>

          <div className="text-center md:text-right">
            <p className="text-white/60 font-medium mb-2 uppercase tracking-wider text-sm">Average per day</p>
            <div className="flex items-center justify-center md:justify-end gap-3 text-terracotta">
              <span className="text-3xl font-bold">
                {currencySymbol}{Math.round(totalBudget / (days || 1)).toLocaleString()}
              </span>
              <span className="text-white/40 text-sm font-normal">/ day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetChart
