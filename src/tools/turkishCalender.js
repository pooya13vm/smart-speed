export const makeTurkishDate = (date) => {
  const indexOfSpace = date.indexOf(" ");
  const restOfDate = date.slice(indexOfSpace, date.length);
  const englishMonth = date.slice(0, indexOfSpace);
  let turkishMonth = "";
  if (englishMonth === "Jan") turkishMonth = "Ocak";
  if (englishMonth === "Feb") turkishMonth = "şubat";
  if (englishMonth === "Mar") turkishMonth = "Mart";
  if (englishMonth === "Apr") turkishMonth = "Nisan";
  if (englishMonth === "May") turkishMonth = "Mayıs";
  if (englishMonth === "June") turkishMonth = "Haziran";
  if (englishMonth === "July") turkishMonth = "Temmuz";
  if (englishMonth === "Aug") turkishMonth = "Ağustos";
  if (englishMonth === "Sept") turkishMonth = "Eylül";
  if (englishMonth === "Oct") turkishMonth = "Ekim";
  if (englishMonth === "Nov") turkishMonth = "Kasım";
  if (englishMonth === "Dec") turkishMonth = "Aralık";

  return turkishMonth + restOfDate;
};
