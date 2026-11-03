// rows — massivlar massivi: [["Talaba", "Summa"], ["Ali Karimov", 800000], ...]
export function downloadCsv(filename, rows) {
  // Ajratgich ";" — o'zbek va rus sozlamali Excel ustunlarni shu belgi bo'yicha ajratadi
  // (vergul bilan hamma ma'lumot bitta ustunga tushib qolardi)
  const lines = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(";"))
  const text = lines.join("\r\n")

  // "\uFEFF" — Excel o'zbekcha harflarni (o', g') to'g'ri ochishi uchun belgi
  const blob = new Blob(["\uFEFF" + text], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  // Ko'rinmas <a> havola: Firefox uchun sahifaga qo'shilgan bo'lishi kerak
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  // Darhol o'chirsak, ba'zi brauzerlar yuklashni bekor qiladi
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
