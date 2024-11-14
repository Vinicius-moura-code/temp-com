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
  