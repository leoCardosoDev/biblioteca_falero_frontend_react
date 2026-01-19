export type Either<L, R> = Left<L> | Right<R>

export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L> {
    return true
  }

  isRight(): this is Right<never> {
    return false
  }
}

export class Right<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isLeft(): this is Left<never> {
    return false
  }

  isRight(): this is Right<R> {
    return true
  }
}

export function left<L, R = never>(value: L): Either<L, R> {
  return new Left(value)
}

export function right<R, L = never>(value: R): Either<L, R> {
  return new Right(value)
}
