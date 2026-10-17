import PropTypes from "prop-types"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLastMonths } from "@/utils/date"
import { formatMoney } from "@/utils/format"

// BONUS: oxirgi 6 oy tushumi (to'lov sanasi — paidAt bo'yicha)
function IncomeChart({ payments }) {
  const data = getLastMonths(6).map((month) => ({
    label: month.label,
    total: payments.filter((p) => p.paidAt.startsWith(month.key)).reduce((sum, p) => sum + p.amount, 0),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oxirgi 6 oy tushumi</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
            {/* Y o'qida mln ko'rinishida: 8 050 000 → "8 mln" */}
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="var(--muted-foreground)"
              tickFormatter={(value) => `${Math.round(value / 1000000)} mln`}
            />
            <Tooltip
              formatter={(value) => [formatMoney(value), "Tushum"]}
              cursor={{ fill: "var(--muted)" }}
              contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }}
            />
            <Bar dataKey="total" fill="#16a34a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

IncomeChart.propTypes = {
  payments: PropTypes.array.isRequired,
}

export default IncomeChart
