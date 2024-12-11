import dayjs from "dayjs";

export function formatEmail(email: string): string {
    const [user, domain] = email.split('@');
    const [domainName, ...domainSuffixParts] = domain.split('.');
  
    const maskedUser = user.slice(0, 2) + '*'.repeat(user.length - 2);
  
    const maskedDomain = domainName.slice(0, 2) + '*'.repeat(domainName.length - 2);
  
    const maskedSuffix = domainSuffixParts
      .map(part => '*'.repeat(part.length))
      .join('.');
  
    return `${maskedUser}@${maskedDomain}.${maskedSuffix}`;
  }
  

  export function formatToMoney(value: number, locale: string = "pt-BR", currency: string = "BRL"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  }

  export function formatToDate(data: string) {
     return dayjs(data).format("DD/MM/YYYY");
  }

  export function  PercentageValue (value: number){
    // Formata o valor como porcentagem
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2, // Define o número mínimo de casas decimais
      maximumFractionDigits: 2, // Define o número máximo de casas decimais
    }).format(value);
  
    return formattedValue
  };