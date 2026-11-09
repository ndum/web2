class Member {
  constructor(number, since) {
    this.number = number
    this.since = since
  }

  toString() {
    return `${this.number}, [%Mitglied seit|member since%] ${this.since}`
  }
}

const member = new Member('M-117', 2024)
console.log(`${member}`)
console.log(member instanceof Member)
