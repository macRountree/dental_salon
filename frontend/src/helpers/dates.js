import {parse, formatISO, parseISO, format} from 'date-fns';

//*MONGO db store the dates in ISO format

export function convertToIso(strDate) {
  const newDate = parse(strDate, 'yyyy/MM/dd', new Date());
  //* console.log(newDate);
  //*console.log(formatISO(newDate)); //* formatISO have T0:00:00:xX  after the date
  return formatISO(newDate);
}

//* revertIso to display in Vue component

export function displayDate(date) {
  const newDate = parseISO(date);
  const formattedDate = format(newDate, 'PPPP');
  return formattedDate;
}

export function convertToYYYYMMDD(isoDate) {
  const newDAte = new Date(isoDate);
  const formattedDate = format(newDAte, 'yyyy/MM/dd');
  return formattedDate;
}
