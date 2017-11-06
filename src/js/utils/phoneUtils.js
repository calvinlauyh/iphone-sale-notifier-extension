export function getPhoneName(t, phone) {
  return `${t(`iphone.model.${phone.model}`)} ${t(`iphone.size.${phone.size}`)} ${t(`iphone.color.${phone.color}`)} ${t(`iphone.capacity.${phone.capacity}`)}`
}