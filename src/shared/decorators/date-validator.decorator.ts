import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(expiresAt: string, args: ValidationArguments) {
          try {
            if (!expiresAt) {
              return true;
            }

            const now = new Date().getTime();
            const expiresAtDate = new Date(expiresAt).getTime();
            return expiresAtDate > now;
          } catch (error) {
            return false;
          }
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser uma data futura`;
        },
      },
    });
  }
}

export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyName: string) {
    registerDecorator({
      name: 'isPastDate',
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(expiresAt: string, args: ValidationArguments) {
          try {
            if (!expiresAt) {
              return true;
            }

            const now = new Date().getTime();
            const expiresAtDate = new Date(expiresAt).getTime();
            return expiresAtDate < now;
          } catch (error) {
            return false;
          }
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser uma data passada`;
        },
      },
    });

  }

}
