// rows — massivlar massivi: [["Talaba", "Summa"], ["Ali Karimov", 800000], ...]
export function downloadCsv(filename, rows) {
  // Har katakni qo'shtirnoqqa olamiz (ichida vergul bo'lsa ham buzilmasin)
  const lines = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
  const text = lines.join("\n")

  // "\uFEFF" — Excel o'zbekcha harflarni (o', g') to'g'ri ochishi uchun belgi
  const blob = new Blob(["\uFEFF" + text], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  // Ko'rinmas <a> havola yasab, uni bosamiz — brauzer faylni yuklab oladi
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
