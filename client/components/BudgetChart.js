import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = {
  'Accommodation': '#C45D3E',
  'Food': '#7D8B75',
  'Activities': '#F5A86C',
  'Transport': '#8FB9C8',
  'Shopping': '#E8B4BC',
  'Other': '#9CA3AF',
}

const BudgetChart = ({ budget, selectedCurrency = 'USD', convertCurrency, currencySymbol = '$' }) => {
  const data = budget.breakdown.map((item) => ({
    name: item.category,
    value: convertCurrency ? convertCurrency(item.estimatedCost) : item.estimatedCost,
  }))

  const totalBudget = convertCurrency ? convertCurrency(budget.totalEstimatedCost) : budget.totalEstimatedCost

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const originalValue = budget.breakdown.find(item => item.category === payload[0].name)?.estimatedCost || 0
      const convertedValue = convertCurrency ? convertCurrency(originalValue) : originalValue
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-charcoal mb-2">{payload[0].name}</p>
          <p className="text-terracotta font-bold text-lg">
            {currencySymbol}{convertedValue.toLocaleString()}
          </p>
          {selectedCurrency !== 'USD' && (
            <p className="text-sm text-charcoal/60">
              Original: ${originalValue.toLocaleString()} USD
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              className="text-sm"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name] || COLORS['Other']}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown List */}
      <div className="space-y-4">
        <h4 className="text-xl font-serif font-bold text-charcoal mb-4">
          Detailed Breakdown
        </h4>
        <div className="space-y-3">
          {budget.breakdown.map((item, index) => {
            const convertedValue = convertCurrency ? convertCurrency(item.estimatedCost) : item.estimatedCost
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-cream rounded-xl hover:bg-creamDark transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[item.category] || COLORS['Other'] }}
                  ></div>
                  <div>
                    <span className="font-medium text-charcoal">{item.category}</span>
                    {selectedCurrency !== 'USD' && (
                      <span className="text-sm text-charcoal/60 ml-2">
                        (${item.estimatedCost.toLocaleString()} USD)
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-lg font-bold text-charcoal">
                  {currencySymbol}{convertedValue.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-terracotta/5 to-sage/5 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-charcoal/60 font-medium mb-1">Total Estimated Cost</p>
            <p className="text-3xl font-bold text-charcoal">
              {currencySymbol}{totalBudget.toLocaleString()}
            </p>
            {selectedCurrency !== 'USD' && (
              <p className="text-sm text-charcoal/60 mt-1">
                Original: ${budget.totalEstimatedCost.toLocaleString()} USD
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-charcoal/60">
              Average per day
            </p>
            <p className="text-xl font-semibold text-terracotta">
              {currencySymbol}{Math.round(totalBudget / 3).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetChart
