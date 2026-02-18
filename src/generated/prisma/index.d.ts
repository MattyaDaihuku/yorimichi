
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model Chatlist
 * 
 */
export type Chatlist = $Result.DefaultSelection<Prisma.$ChatlistPayload>
/**
 * Model Branches
 * 
 */
export type Branches = $Result.DefaultSelection<Prisma.$BranchesPayload>
/**
 * Model Block
 * 
 */
export type Block = $Result.DefaultSelection<Prisma.$BlockPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatlist`: Exposes CRUD operations for the **Chatlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chatlists
    * const chatlists = await prisma.chatlist.findMany()
    * ```
    */
  get chatlist(): Prisma.ChatlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branches`: Exposes CRUD operations for the **Branches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branches.findMany()
    * ```
    */
  get branches(): Prisma.BranchesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.block`: Exposes CRUD operations for the **Block** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blocks
    * const blocks = await prisma.block.findMany()
    * ```
    */
  get block(): Prisma.BlockDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.0
   * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Users: 'Users',
    Chatlist: 'Chatlist',
    Branches: 'Branches',
    Block: 'Block'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "chatlist" | "branches" | "block"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      Chatlist: {
        payload: Prisma.$ChatlistPayload<ExtArgs>
        fields: Prisma.ChatlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>
          }
          findFirst: {
            args: Prisma.ChatlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>
          }
          findMany: {
            args: Prisma.ChatlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>[]
          }
          create: {
            args: Prisma.ChatlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>
          }
          createMany: {
            args: Prisma.ChatlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>[]
          }
          delete: {
            args: Prisma.ChatlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>
          }
          update: {
            args: Prisma.ChatlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>
          }
          deleteMany: {
            args: Prisma.ChatlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>[]
          }
          upsert: {
            args: Prisma.ChatlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatlistPayload>
          }
          aggregate: {
            args: Prisma.ChatlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatlist>
          }
          groupBy: {
            args: Prisma.ChatlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatlistCountArgs<ExtArgs>
            result: $Utils.Optional<ChatlistCountAggregateOutputType> | number
          }
        }
      }
      Branches: {
        payload: Prisma.$BranchesPayload<ExtArgs>
        fields: Prisma.BranchesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>
          }
          findFirst: {
            args: Prisma.BranchesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>
          }
          findMany: {
            args: Prisma.BranchesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>[]
          }
          create: {
            args: Prisma.BranchesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>
          }
          createMany: {
            args: Prisma.BranchesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>[]
          }
          delete: {
            args: Prisma.BranchesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>
          }
          update: {
            args: Prisma.BranchesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>
          }
          deleteMany: {
            args: Prisma.BranchesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>[]
          }
          upsert: {
            args: Prisma.BranchesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchesPayload>
          }
          aggregate: {
            args: Prisma.BranchesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranches>
          }
          groupBy: {
            args: Prisma.BranchesGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchesGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchesCountArgs<ExtArgs>
            result: $Utils.Optional<BranchesCountAggregateOutputType> | number
          }
        }
      }
      Block: {
        payload: Prisma.$BlockPayload<ExtArgs>
        fields: Prisma.BlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findFirst: {
            args: Prisma.BlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findMany: {
            args: Prisma.BlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          create: {
            args: Prisma.BlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          createMany: {
            args: Prisma.BlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          delete: {
            args: Prisma.BlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          update: {
            args: Prisma.BlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          deleteMany: {
            args: Prisma.BlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          upsert: {
            args: Prisma.BlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          aggregate: {
            args: Prisma.BlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlock>
          }
          groupBy: {
            args: Prisma.BlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockCountArgs<ExtArgs>
            result: $Utils.Optional<BlockCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    users?: UsersOmit
    chatlist?: ChatlistOmit
    branches?: BranchesOmit
    block?: BlockOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    chatlists: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatlists?: boolean | UsersCountOutputTypeCountChatlistsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountChatlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatlistWhereInput
  }


  /**
   * Count Type ChatlistCountOutputType
   */

  export type ChatlistCountOutputType = {
    branches: number
  }

  export type ChatlistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branches?: boolean | ChatlistCountOutputTypeCountBranchesArgs
  }

  // Custom InputTypes
  /**
   * ChatlistCountOutputType without action
   */
  export type ChatlistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatlistCountOutputType
     */
    select?: ChatlistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatlistCountOutputType without action
   */
  export type ChatlistCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchesWhereInput
  }


  /**
   * Count Type BranchesCountOutputType
   */

  export type BranchesCountOutputType = {
    child_branches: number
    blocks: number
  }

  export type BranchesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child_branches?: boolean | BranchesCountOutputTypeCountChild_branchesArgs
    blocks?: boolean | BranchesCountOutputTypeCountBlocksArgs
  }

  // Custom InputTypes
  /**
   * BranchesCountOutputType without action
   */
  export type BranchesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchesCountOutputType
     */
    select?: BranchesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchesCountOutputType without action
   */
  export type BranchesCountOutputTypeCountChild_branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchesWhereInput
  }

  /**
   * BranchesCountOutputType without action
   */
  export type BranchesCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
  }


  /**
   * Count Type BlockCountOutputType
   */

  export type BlockCountOutputType = {
    forked_branches: number
  }

  export type BlockCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    forked_branches?: boolean | BlockCountOutputTypeCountForked_branchesArgs
  }

  // Custom InputTypes
  /**
   * BlockCountOutputType without action
   */
  export type BlockCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockCountOutputType
     */
    select?: BlockCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlockCountOutputType without action
   */
  export type BlockCountOutputTypeCountForked_branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: string | null
    clerk_id: string | null
    name: string | null
    email: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: string | null
    clerk_id: string | null
    name: string | null
    email: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    clerk_id: number
    name: number
    email: number
    created_at: number
    update_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    user_id?: true
    clerk_id?: true
    name?: true
    email?: true
    created_at?: true
    update_at?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    clerk_id?: true
    name?: true
    email?: true
    created_at?: true
    update_at?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    clerk_id?: true
    name?: true
    email?: true
    created_at?: true
    update_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: string
    clerk_id: string
    name: string
    email: string
    created_at: Date
    update_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    clerk_id?: boolean
    name?: boolean
    email?: boolean
    created_at?: boolean
    update_at?: boolean
    chatlists?: boolean | Users$chatlistsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    clerk_id?: boolean
    name?: boolean
    email?: boolean
    created_at?: boolean
    update_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    clerk_id?: boolean
    name?: boolean
    email?: boolean
    created_at?: boolean
    update_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    user_id?: boolean
    clerk_id?: boolean
    name?: boolean
    email?: boolean
    created_at?: boolean
    update_at?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "clerk_id" | "name" | "email" | "created_at" | "update_at", ExtArgs["result"]["users"]>
  export type UsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatlists?: boolean | Users$chatlistsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      chatlists: Prisma.$ChatlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      clerk_id: string
      name: string
      email: string
      created_at: Date
      update_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UsersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chatlists<T extends Users$chatlistsArgs<ExtArgs> = {}>(args?: Subset<T, Users$chatlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly user_id: FieldRef<"Users", 'String'>
    readonly clerk_id: FieldRef<"Users", 'String'>
    readonly name: FieldRef<"Users", 'String'>
    readonly email: FieldRef<"Users", 'String'>
    readonly created_at: FieldRef<"Users", 'DateTime'>
    readonly update_at: FieldRef<"Users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users updateManyAndReturn
   */
  export type UsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users.chatlists
   */
  export type Users$chatlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    where?: ChatlistWhereInput
    orderBy?: ChatlistOrderByWithRelationInput | ChatlistOrderByWithRelationInput[]
    cursor?: ChatlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatlistScalarFieldEnum | ChatlistScalarFieldEnum[]
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
  }


  /**
   * Model Chatlist
   */

  export type AggregateChatlist = {
    _count: ChatlistCountAggregateOutputType | null
    _min: ChatlistMinAggregateOutputType | null
    _max: ChatlistMaxAggregateOutputType | null
  }

  export type ChatlistMinAggregateOutputType = {
    chat_id: string | null
    user_id: string | null
    is_pinned: boolean | null
    chat_title: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type ChatlistMaxAggregateOutputType = {
    chat_id: string | null
    user_id: string | null
    is_pinned: boolean | null
    chat_title: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type ChatlistCountAggregateOutputType = {
    chat_id: number
    user_id: number
    is_pinned: number
    chat_title: number
    created_at: number
    update_at: number
    _all: number
  }


  export type ChatlistMinAggregateInputType = {
    chat_id?: true
    user_id?: true
    is_pinned?: true
    chat_title?: true
    created_at?: true
    update_at?: true
  }

  export type ChatlistMaxAggregateInputType = {
    chat_id?: true
    user_id?: true
    is_pinned?: true
    chat_title?: true
    created_at?: true
    update_at?: true
  }

  export type ChatlistCountAggregateInputType = {
    chat_id?: true
    user_id?: true
    is_pinned?: true
    chat_title?: true
    created_at?: true
    update_at?: true
    _all?: true
  }

  export type ChatlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chatlist to aggregate.
     */
    where?: ChatlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatlists to fetch.
     */
    orderBy?: ChatlistOrderByWithRelationInput | ChatlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chatlists
    **/
    _count?: true | ChatlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatlistMaxAggregateInputType
  }

  export type GetChatlistAggregateType<T extends ChatlistAggregateArgs> = {
        [P in keyof T & keyof AggregateChatlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatlist[P]>
      : GetScalarType<T[P], AggregateChatlist[P]>
  }




  export type ChatlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatlistWhereInput
    orderBy?: ChatlistOrderByWithAggregationInput | ChatlistOrderByWithAggregationInput[]
    by: ChatlistScalarFieldEnum[] | ChatlistScalarFieldEnum
    having?: ChatlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatlistCountAggregateInputType | true
    _min?: ChatlistMinAggregateInputType
    _max?: ChatlistMaxAggregateInputType
  }

  export type ChatlistGroupByOutputType = {
    chat_id: string
    user_id: string
    is_pinned: boolean
    chat_title: string
    created_at: Date
    update_at: Date
    _count: ChatlistCountAggregateOutputType | null
    _min: ChatlistMinAggregateOutputType | null
    _max: ChatlistMaxAggregateOutputType | null
  }

  type GetChatlistGroupByPayload<T extends ChatlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatlistGroupByOutputType[P]>
            : GetScalarType<T[P], ChatlistGroupByOutputType[P]>
        }
      >
    >


  export type ChatlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chat_id?: boolean
    user_id?: boolean
    is_pinned?: boolean
    chat_title?: boolean
    created_at?: boolean
    update_at?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    branches?: boolean | Chatlist$branchesArgs<ExtArgs>
    _count?: boolean | ChatlistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatlist"]>

  export type ChatlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chat_id?: boolean
    user_id?: boolean
    is_pinned?: boolean
    chat_title?: boolean
    created_at?: boolean
    update_at?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatlist"]>

  export type ChatlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chat_id?: boolean
    user_id?: boolean
    is_pinned?: boolean
    chat_title?: boolean
    created_at?: boolean
    update_at?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatlist"]>

  export type ChatlistSelectScalar = {
    chat_id?: boolean
    user_id?: boolean
    is_pinned?: boolean
    chat_title?: boolean
    created_at?: boolean
    update_at?: boolean
  }

  export type ChatlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chat_id" | "user_id" | "is_pinned" | "chat_title" | "created_at" | "update_at", ExtArgs["result"]["chatlist"]>
  export type ChatlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    branches?: boolean | Chatlist$branchesArgs<ExtArgs>
    _count?: boolean | ChatlistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatlistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type ChatlistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $ChatlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chatlist"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
      branches: Prisma.$BranchesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      chat_id: string
      user_id: string
      is_pinned: boolean
      chat_title: string
      created_at: Date
      update_at: Date
    }, ExtArgs["result"]["chatlist"]>
    composites: {}
  }

  type ChatlistGetPayload<S extends boolean | null | undefined | ChatlistDefaultArgs> = $Result.GetResult<Prisma.$ChatlistPayload, S>

  type ChatlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatlistCountAggregateInputType | true
    }

  export interface ChatlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chatlist'], meta: { name: 'Chatlist' } }
    /**
     * Find zero or one Chatlist that matches the filter.
     * @param {ChatlistFindUniqueArgs} args - Arguments to find a Chatlist
     * @example
     * // Get one Chatlist
     * const chatlist = await prisma.chatlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatlistFindUniqueArgs>(args: SelectSubset<T, ChatlistFindUniqueArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chatlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatlistFindUniqueOrThrowArgs} args - Arguments to find a Chatlist
     * @example
     * // Get one Chatlist
     * const chatlist = await prisma.chatlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatlistFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chatlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistFindFirstArgs} args - Arguments to find a Chatlist
     * @example
     * // Get one Chatlist
     * const chatlist = await prisma.chatlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatlistFindFirstArgs>(args?: SelectSubset<T, ChatlistFindFirstArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chatlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistFindFirstOrThrowArgs} args - Arguments to find a Chatlist
     * @example
     * // Get one Chatlist
     * const chatlist = await prisma.chatlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatlistFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chatlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chatlists
     * const chatlists = await prisma.chatlist.findMany()
     * 
     * // Get first 10 Chatlists
     * const chatlists = await prisma.chatlist.findMany({ take: 10 })
     * 
     * // Only select the `chat_id`
     * const chatlistWithChat_idOnly = await prisma.chatlist.findMany({ select: { chat_id: true } })
     * 
     */
    findMany<T extends ChatlistFindManyArgs>(args?: SelectSubset<T, ChatlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chatlist.
     * @param {ChatlistCreateArgs} args - Arguments to create a Chatlist.
     * @example
     * // Create one Chatlist
     * const Chatlist = await prisma.chatlist.create({
     *   data: {
     *     // ... data to create a Chatlist
     *   }
     * })
     * 
     */
    create<T extends ChatlistCreateArgs>(args: SelectSubset<T, ChatlistCreateArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chatlists.
     * @param {ChatlistCreateManyArgs} args - Arguments to create many Chatlists.
     * @example
     * // Create many Chatlists
     * const chatlist = await prisma.chatlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatlistCreateManyArgs>(args?: SelectSubset<T, ChatlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chatlists and returns the data saved in the database.
     * @param {ChatlistCreateManyAndReturnArgs} args - Arguments to create many Chatlists.
     * @example
     * // Create many Chatlists
     * const chatlist = await prisma.chatlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chatlists and only return the `chat_id`
     * const chatlistWithChat_idOnly = await prisma.chatlist.createManyAndReturn({
     *   select: { chat_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatlistCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chatlist.
     * @param {ChatlistDeleteArgs} args - Arguments to delete one Chatlist.
     * @example
     * // Delete one Chatlist
     * const Chatlist = await prisma.chatlist.delete({
     *   where: {
     *     // ... filter to delete one Chatlist
     *   }
     * })
     * 
     */
    delete<T extends ChatlistDeleteArgs>(args: SelectSubset<T, ChatlistDeleteArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chatlist.
     * @param {ChatlistUpdateArgs} args - Arguments to update one Chatlist.
     * @example
     * // Update one Chatlist
     * const chatlist = await prisma.chatlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatlistUpdateArgs>(args: SelectSubset<T, ChatlistUpdateArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chatlists.
     * @param {ChatlistDeleteManyArgs} args - Arguments to filter Chatlists to delete.
     * @example
     * // Delete a few Chatlists
     * const { count } = await prisma.chatlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatlistDeleteManyArgs>(args?: SelectSubset<T, ChatlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chatlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chatlists
     * const chatlist = await prisma.chatlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatlistUpdateManyArgs>(args: SelectSubset<T, ChatlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chatlists and returns the data updated in the database.
     * @param {ChatlistUpdateManyAndReturnArgs} args - Arguments to update many Chatlists.
     * @example
     * // Update many Chatlists
     * const chatlist = await prisma.chatlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chatlists and only return the `chat_id`
     * const chatlistWithChat_idOnly = await prisma.chatlist.updateManyAndReturn({
     *   select: { chat_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatlistUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chatlist.
     * @param {ChatlistUpsertArgs} args - Arguments to update or create a Chatlist.
     * @example
     * // Update or create a Chatlist
     * const chatlist = await prisma.chatlist.upsert({
     *   create: {
     *     // ... data to create a Chatlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chatlist we want to update
     *   }
     * })
     */
    upsert<T extends ChatlistUpsertArgs>(args: SelectSubset<T, ChatlistUpsertArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chatlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistCountArgs} args - Arguments to filter Chatlists to count.
     * @example
     * // Count the number of Chatlists
     * const count = await prisma.chatlist.count({
     *   where: {
     *     // ... the filter for the Chatlists we want to count
     *   }
     * })
    **/
    count<T extends ChatlistCountArgs>(
      args?: Subset<T, ChatlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chatlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatlistAggregateArgs>(args: Subset<T, ChatlistAggregateArgs>): Prisma.PrismaPromise<GetChatlistAggregateType<T>>

    /**
     * Group by Chatlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatlistGroupByArgs['orderBy'] }
        : { orderBy?: ChatlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chatlist model
   */
  readonly fields: ChatlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chatlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    branches<T extends Chatlist$branchesArgs<ExtArgs> = {}>(args?: Subset<T, Chatlist$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chatlist model
   */
  interface ChatlistFieldRefs {
    readonly chat_id: FieldRef<"Chatlist", 'String'>
    readonly user_id: FieldRef<"Chatlist", 'String'>
    readonly is_pinned: FieldRef<"Chatlist", 'Boolean'>
    readonly chat_title: FieldRef<"Chatlist", 'String'>
    readonly created_at: FieldRef<"Chatlist", 'DateTime'>
    readonly update_at: FieldRef<"Chatlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chatlist findUnique
   */
  export type ChatlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * Filter, which Chatlist to fetch.
     */
    where: ChatlistWhereUniqueInput
  }

  /**
   * Chatlist findUniqueOrThrow
   */
  export type ChatlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * Filter, which Chatlist to fetch.
     */
    where: ChatlistWhereUniqueInput
  }

  /**
   * Chatlist findFirst
   */
  export type ChatlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * Filter, which Chatlist to fetch.
     */
    where?: ChatlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatlists to fetch.
     */
    orderBy?: ChatlistOrderByWithRelationInput | ChatlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chatlists.
     */
    cursor?: ChatlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chatlists.
     */
    distinct?: ChatlistScalarFieldEnum | ChatlistScalarFieldEnum[]
  }

  /**
   * Chatlist findFirstOrThrow
   */
  export type ChatlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * Filter, which Chatlist to fetch.
     */
    where?: ChatlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatlists to fetch.
     */
    orderBy?: ChatlistOrderByWithRelationInput | ChatlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chatlists.
     */
    cursor?: ChatlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chatlists.
     */
    distinct?: ChatlistScalarFieldEnum | ChatlistScalarFieldEnum[]
  }

  /**
   * Chatlist findMany
   */
  export type ChatlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * Filter, which Chatlists to fetch.
     */
    where?: ChatlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chatlists to fetch.
     */
    orderBy?: ChatlistOrderByWithRelationInput | ChatlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chatlists.
     */
    cursor?: ChatlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chatlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chatlists.
     */
    skip?: number
    distinct?: ChatlistScalarFieldEnum | ChatlistScalarFieldEnum[]
  }

  /**
   * Chatlist create
   */
  export type ChatlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Chatlist.
     */
    data: XOR<ChatlistCreateInput, ChatlistUncheckedCreateInput>
  }

  /**
   * Chatlist createMany
   */
  export type ChatlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chatlists.
     */
    data: ChatlistCreateManyInput | ChatlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chatlist createManyAndReturn
   */
  export type ChatlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * The data used to create many Chatlists.
     */
    data: ChatlistCreateManyInput | ChatlistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chatlist update
   */
  export type ChatlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Chatlist.
     */
    data: XOR<ChatlistUpdateInput, ChatlistUncheckedUpdateInput>
    /**
     * Choose, which Chatlist to update.
     */
    where: ChatlistWhereUniqueInput
  }

  /**
   * Chatlist updateMany
   */
  export type ChatlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chatlists.
     */
    data: XOR<ChatlistUpdateManyMutationInput, ChatlistUncheckedUpdateManyInput>
    /**
     * Filter which Chatlists to update
     */
    where?: ChatlistWhereInput
    /**
     * Limit how many Chatlists to update.
     */
    limit?: number
  }

  /**
   * Chatlist updateManyAndReturn
   */
  export type ChatlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * The data used to update Chatlists.
     */
    data: XOR<ChatlistUpdateManyMutationInput, ChatlistUncheckedUpdateManyInput>
    /**
     * Filter which Chatlists to update
     */
    where?: ChatlistWhereInput
    /**
     * Limit how many Chatlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chatlist upsert
   */
  export type ChatlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Chatlist to update in case it exists.
     */
    where: ChatlistWhereUniqueInput
    /**
     * In case the Chatlist found by the `where` argument doesn't exist, create a new Chatlist with this data.
     */
    create: XOR<ChatlistCreateInput, ChatlistUncheckedCreateInput>
    /**
     * In case the Chatlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatlistUpdateInput, ChatlistUncheckedUpdateInput>
  }

  /**
   * Chatlist delete
   */
  export type ChatlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
    /**
     * Filter which Chatlist to delete.
     */
    where: ChatlistWhereUniqueInput
  }

  /**
   * Chatlist deleteMany
   */
  export type ChatlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chatlists to delete
     */
    where?: ChatlistWhereInput
    /**
     * Limit how many Chatlists to delete.
     */
    limit?: number
  }

  /**
   * Chatlist.branches
   */
  export type Chatlist$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    where?: BranchesWhereInput
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    cursor?: BranchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * Chatlist without action
   */
  export type ChatlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chatlist
     */
    select?: ChatlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chatlist
     */
    omit?: ChatlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatlistInclude<ExtArgs> | null
  }


  /**
   * Model Branches
   */

  export type AggregateBranches = {
    _count: BranchesCountAggregateOutputType | null
    _avg: BranchesAvgAggregateOutputType | null
    _sum: BranchesSumAggregateOutputType | null
    _min: BranchesMinAggregateOutputType | null
    _max: BranchesMaxAggregateOutputType | null
  }

  export type BranchesAvgAggregateOutputType = {
    depth: number | null
  }

  export type BranchesSumAggregateOutputType = {
    depth: number | null
  }

  export type BranchesMinAggregateOutputType = {
    branch_id: string | null
    chat_id: string | null
    parent_branch_id: string | null
    parent_block_id: string | null
    branch_title: string | null
    status: string | null
    depth: number | null
    created_at: Date | null
    update_at: Date | null
  }

  export type BranchesMaxAggregateOutputType = {
    branch_id: string | null
    chat_id: string | null
    parent_branch_id: string | null
    parent_block_id: string | null
    branch_title: string | null
    status: string | null
    depth: number | null
    created_at: Date | null
    update_at: Date | null
  }

  export type BranchesCountAggregateOutputType = {
    branch_id: number
    chat_id: number
    parent_branch_id: number
    parent_block_id: number
    branch_title: number
    status: number
    depth: number
    created_at: number
    update_at: number
    _all: number
  }


  export type BranchesAvgAggregateInputType = {
    depth?: true
  }

  export type BranchesSumAggregateInputType = {
    depth?: true
  }

  export type BranchesMinAggregateInputType = {
    branch_id?: true
    chat_id?: true
    parent_branch_id?: true
    parent_block_id?: true
    branch_title?: true
    status?: true
    depth?: true
    created_at?: true
    update_at?: true
  }

  export type BranchesMaxAggregateInputType = {
    branch_id?: true
    chat_id?: true
    parent_branch_id?: true
    parent_block_id?: true
    branch_title?: true
    status?: true
    depth?: true
    created_at?: true
    update_at?: true
  }

  export type BranchesCountAggregateInputType = {
    branch_id?: true
    chat_id?: true
    parent_branch_id?: true
    parent_block_id?: true
    branch_title?: true
    status?: true
    depth?: true
    created_at?: true
    update_at?: true
    _all?: true
  }

  export type BranchesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to aggregate.
     */
    where?: BranchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchesMaxAggregateInputType
  }

  export type GetBranchesAggregateType<T extends BranchesAggregateArgs> = {
        [P in keyof T & keyof AggregateBranches]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranches[P]>
      : GetScalarType<T[P], AggregateBranches[P]>
  }




  export type BranchesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchesWhereInput
    orderBy?: BranchesOrderByWithAggregationInput | BranchesOrderByWithAggregationInput[]
    by: BranchesScalarFieldEnum[] | BranchesScalarFieldEnum
    having?: BranchesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchesCountAggregateInputType | true
    _avg?: BranchesAvgAggregateInputType
    _sum?: BranchesSumAggregateInputType
    _min?: BranchesMinAggregateInputType
    _max?: BranchesMaxAggregateInputType
  }

  export type BranchesGroupByOutputType = {
    branch_id: string
    chat_id: string
    parent_branch_id: string | null
    parent_block_id: string | null
    branch_title: string
    status: string
    depth: number
    created_at: Date
    update_at: Date
    _count: BranchesCountAggregateOutputType | null
    _avg: BranchesAvgAggregateOutputType | null
    _sum: BranchesSumAggregateOutputType | null
    _min: BranchesMinAggregateOutputType | null
    _max: BranchesMaxAggregateOutputType | null
  }

  type GetBranchesGroupByPayload<T extends BranchesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchesGroupByOutputType[P]>
            : GetScalarType<T[P], BranchesGroupByOutputType[P]>
        }
      >
    >


  export type BranchesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    branch_id?: boolean
    chat_id?: boolean
    parent_branch_id?: boolean
    parent_block_id?: boolean
    branch_title?: boolean
    status?: boolean
    depth?: boolean
    created_at?: boolean
    update_at?: boolean
    chat?: boolean | ChatlistDefaultArgs<ExtArgs>
    parent_branch?: boolean | Branches$parent_branchArgs<ExtArgs>
    child_branches?: boolean | Branches$child_branchesArgs<ExtArgs>
    parent_block?: boolean | Branches$parent_blockArgs<ExtArgs>
    blocks?: boolean | Branches$blocksArgs<ExtArgs>
    _count?: boolean | BranchesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branches"]>

  export type BranchesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    branch_id?: boolean
    chat_id?: boolean
    parent_branch_id?: boolean
    parent_block_id?: boolean
    branch_title?: boolean
    status?: boolean
    depth?: boolean
    created_at?: boolean
    update_at?: boolean
    chat?: boolean | ChatlistDefaultArgs<ExtArgs>
    parent_branch?: boolean | Branches$parent_branchArgs<ExtArgs>
    parent_block?: boolean | Branches$parent_blockArgs<ExtArgs>
  }, ExtArgs["result"]["branches"]>

  export type BranchesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    branch_id?: boolean
    chat_id?: boolean
    parent_branch_id?: boolean
    parent_block_id?: boolean
    branch_title?: boolean
    status?: boolean
    depth?: boolean
    created_at?: boolean
    update_at?: boolean
    chat?: boolean | ChatlistDefaultArgs<ExtArgs>
    parent_branch?: boolean | Branches$parent_branchArgs<ExtArgs>
    parent_block?: boolean | Branches$parent_blockArgs<ExtArgs>
  }, ExtArgs["result"]["branches"]>

  export type BranchesSelectScalar = {
    branch_id?: boolean
    chat_id?: boolean
    parent_branch_id?: boolean
    parent_block_id?: boolean
    branch_title?: boolean
    status?: boolean
    depth?: boolean
    created_at?: boolean
    update_at?: boolean
  }

  export type BranchesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"branch_id" | "chat_id" | "parent_branch_id" | "parent_block_id" | "branch_title" | "status" | "depth" | "created_at" | "update_at", ExtArgs["result"]["branches"]>
  export type BranchesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatlistDefaultArgs<ExtArgs>
    parent_branch?: boolean | Branches$parent_branchArgs<ExtArgs>
    child_branches?: boolean | Branches$child_branchesArgs<ExtArgs>
    parent_block?: boolean | Branches$parent_blockArgs<ExtArgs>
    blocks?: boolean | Branches$blocksArgs<ExtArgs>
    _count?: boolean | BranchesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BranchesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatlistDefaultArgs<ExtArgs>
    parent_branch?: boolean | Branches$parent_branchArgs<ExtArgs>
    parent_block?: boolean | Branches$parent_blockArgs<ExtArgs>
  }
  export type BranchesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatlistDefaultArgs<ExtArgs>
    parent_branch?: boolean | Branches$parent_branchArgs<ExtArgs>
    parent_block?: boolean | Branches$parent_blockArgs<ExtArgs>
  }

  export type $BranchesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branches"
    objects: {
      chat: Prisma.$ChatlistPayload<ExtArgs>
      parent_branch: Prisma.$BranchesPayload<ExtArgs> | null
      child_branches: Prisma.$BranchesPayload<ExtArgs>[]
      parent_block: Prisma.$BlockPayload<ExtArgs> | null
      blocks: Prisma.$BlockPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      branch_id: string
      chat_id: string
      parent_branch_id: string | null
      parent_block_id: string | null
      branch_title: string
      status: string
      depth: number
      created_at: Date
      update_at: Date
    }, ExtArgs["result"]["branches"]>
    composites: {}
  }

  type BranchesGetPayload<S extends boolean | null | undefined | BranchesDefaultArgs> = $Result.GetResult<Prisma.$BranchesPayload, S>

  type BranchesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchesCountAggregateInputType | true
    }

  export interface BranchesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branches'], meta: { name: 'Branches' } }
    /**
     * Find zero or one Branches that matches the filter.
     * @param {BranchesFindUniqueArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchesFindUniqueArgs>(args: SelectSubset<T, BranchesFindUniqueArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branches that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchesFindUniqueOrThrowArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchesFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesFindFirstArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchesFindFirstArgs>(args?: SelectSubset<T, BranchesFindFirstArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branches that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesFindFirstOrThrowArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchesFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchesFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branches.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branches.findMany({ take: 10 })
     * 
     * // Only select the `branch_id`
     * const branchesWithBranch_idOnly = await prisma.branches.findMany({ select: { branch_id: true } })
     * 
     */
    findMany<T extends BranchesFindManyArgs>(args?: SelectSubset<T, BranchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branches.
     * @param {BranchesCreateArgs} args - Arguments to create a Branches.
     * @example
     * // Create one Branches
     * const Branches = await prisma.branches.create({
     *   data: {
     *     // ... data to create a Branches
     *   }
     * })
     * 
     */
    create<T extends BranchesCreateArgs>(args: SelectSubset<T, BranchesCreateArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchesCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branches = await prisma.branches.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchesCreateManyArgs>(args?: SelectSubset<T, BranchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchesCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branches = await prisma.branches.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `branch_id`
     * const branchesWithBranch_idOnly = await prisma.branches.createManyAndReturn({
     *   select: { branch_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchesCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branches.
     * @param {BranchesDeleteArgs} args - Arguments to delete one Branches.
     * @example
     * // Delete one Branches
     * const Branches = await prisma.branches.delete({
     *   where: {
     *     // ... filter to delete one Branches
     *   }
     * })
     * 
     */
    delete<T extends BranchesDeleteArgs>(args: SelectSubset<T, BranchesDeleteArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branches.
     * @param {BranchesUpdateArgs} args - Arguments to update one Branches.
     * @example
     * // Update one Branches
     * const branches = await prisma.branches.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchesUpdateArgs>(args: SelectSubset<T, BranchesUpdateArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchesDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branches.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchesDeleteManyArgs>(args?: SelectSubset<T, BranchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branches = await prisma.branches.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchesUpdateManyArgs>(args: SelectSubset<T, BranchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchesUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branches = await prisma.branches.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `branch_id`
     * const branchesWithBranch_idOnly = await prisma.branches.updateManyAndReturn({
     *   select: { branch_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchesUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branches.
     * @param {BranchesUpsertArgs} args - Arguments to update or create a Branches.
     * @example
     * // Update or create a Branches
     * const branches = await prisma.branches.upsert({
     *   create: {
     *     // ... data to create a Branches
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branches we want to update
     *   }
     * })
     */
    upsert<T extends BranchesUpsertArgs>(args: SelectSubset<T, BranchesUpsertArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branches.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchesCountArgs>(
      args?: Subset<T, BranchesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchesAggregateArgs>(args: Subset<T, BranchesAggregateArgs>): Prisma.PrismaPromise<GetBranchesAggregateType<T>>

    /**
     * Group by Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchesGroupByArgs['orderBy'] }
        : { orderBy?: BranchesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branches model
   */
  readonly fields: BranchesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branches.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatlistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatlistDefaultArgs<ExtArgs>>): Prisma__ChatlistClient<$Result.GetResult<Prisma.$ChatlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent_branch<T extends Branches$parent_branchArgs<ExtArgs> = {}>(args?: Subset<T, Branches$parent_branchArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    child_branches<T extends Branches$child_branchesArgs<ExtArgs> = {}>(args?: Subset<T, Branches$child_branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parent_block<T extends Branches$parent_blockArgs<ExtArgs> = {}>(args?: Subset<T, Branches$parent_blockArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    blocks<T extends Branches$blocksArgs<ExtArgs> = {}>(args?: Subset<T, Branches$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branches model
   */
  interface BranchesFieldRefs {
    readonly branch_id: FieldRef<"Branches", 'String'>
    readonly chat_id: FieldRef<"Branches", 'String'>
    readonly parent_branch_id: FieldRef<"Branches", 'String'>
    readonly parent_block_id: FieldRef<"Branches", 'String'>
    readonly branch_title: FieldRef<"Branches", 'String'>
    readonly status: FieldRef<"Branches", 'String'>
    readonly depth: FieldRef<"Branches", 'Int'>
    readonly created_at: FieldRef<"Branches", 'DateTime'>
    readonly update_at: FieldRef<"Branches", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Branches findUnique
   */
  export type BranchesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where: BranchesWhereUniqueInput
  }

  /**
   * Branches findUniqueOrThrow
   */
  export type BranchesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where: BranchesWhereUniqueInput
  }

  /**
   * Branches findFirst
   */
  export type BranchesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * Branches findFirstOrThrow
   */
  export type BranchesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * Branches findMany
   */
  export type BranchesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * Branches create
   */
  export type BranchesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * The data needed to create a Branches.
     */
    data: XOR<BranchesCreateInput, BranchesUncheckedCreateInput>
  }

  /**
   * Branches createMany
   */
  export type BranchesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchesCreateManyInput | BranchesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branches createManyAndReturn
   */
  export type BranchesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchesCreateManyInput | BranchesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Branches update
   */
  export type BranchesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * The data needed to update a Branches.
     */
    data: XOR<BranchesUpdateInput, BranchesUncheckedUpdateInput>
    /**
     * Choose, which Branches to update.
     */
    where: BranchesWhereUniqueInput
  }

  /**
   * Branches updateMany
   */
  export type BranchesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchesUpdateManyMutationInput, BranchesUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchesWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branches updateManyAndReturn
   */
  export type BranchesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchesUpdateManyMutationInput, BranchesUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchesWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Branches upsert
   */
  export type BranchesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * The filter to search for the Branches to update in case it exists.
     */
    where: BranchesWhereUniqueInput
    /**
     * In case the Branches found by the `where` argument doesn't exist, create a new Branches with this data.
     */
    create: XOR<BranchesCreateInput, BranchesUncheckedCreateInput>
    /**
     * In case the Branches was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchesUpdateInput, BranchesUncheckedUpdateInput>
  }

  /**
   * Branches delete
   */
  export type BranchesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    /**
     * Filter which Branches to delete.
     */
    where: BranchesWhereUniqueInput
  }

  /**
   * Branches deleteMany
   */
  export type BranchesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchesWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branches.parent_branch
   */
  export type Branches$parent_branchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    where?: BranchesWhereInput
  }

  /**
   * Branches.child_branches
   */
  export type Branches$child_branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    where?: BranchesWhereInput
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    cursor?: BranchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * Branches.parent_block
   */
  export type Branches$parent_blockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
  }

  /**
   * Branches.blocks
   */
  export type Branches$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    cursor?: BlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Branches without action
   */
  export type BranchesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
  }


  /**
   * Model Block
   */

  export type AggregateBlock = {
    _count: BlockCountAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  export type BlockMinAggregateOutputType = {
    block_id: string | null
    branch_id: string | null
    user_content: string | null
    ai_content: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type BlockMaxAggregateOutputType = {
    block_id: string | null
    branch_id: string | null
    user_content: string | null
    ai_content: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type BlockCountAggregateOutputType = {
    block_id: number
    branch_id: number
    user_content: number
    ai_content: number
    created_at: number
    update_at: number
    _all: number
  }


  export type BlockMinAggregateInputType = {
    block_id?: true
    branch_id?: true
    user_content?: true
    ai_content?: true
    created_at?: true
    update_at?: true
  }

  export type BlockMaxAggregateInputType = {
    block_id?: true
    branch_id?: true
    user_content?: true
    ai_content?: true
    created_at?: true
    update_at?: true
  }

  export type BlockCountAggregateInputType = {
    block_id?: true
    branch_id?: true
    user_content?: true
    ai_content?: true
    created_at?: true
    update_at?: true
    _all?: true
  }

  export type BlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Block to aggregate.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blocks
    **/
    _count?: true | BlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockMaxAggregateInputType
  }

  export type GetBlockAggregateType<T extends BlockAggregateArgs> = {
        [P in keyof T & keyof AggregateBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlock[P]>
      : GetScalarType<T[P], AggregateBlock[P]>
  }




  export type BlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithAggregationInput | BlockOrderByWithAggregationInput[]
    by: BlockScalarFieldEnum[] | BlockScalarFieldEnum
    having?: BlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockCountAggregateInputType | true
    _min?: BlockMinAggregateInputType
    _max?: BlockMaxAggregateInputType
  }

  export type BlockGroupByOutputType = {
    block_id: string
    branch_id: string
    user_content: string
    ai_content: string
    created_at: Date
    update_at: Date
    _count: BlockCountAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  type GetBlockGroupByPayload<T extends BlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockGroupByOutputType[P]>
            : GetScalarType<T[P], BlockGroupByOutputType[P]>
        }
      >
    >


  export type BlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    block_id?: boolean
    branch_id?: boolean
    user_content?: boolean
    ai_content?: boolean
    created_at?: boolean
    update_at?: boolean
    branch?: boolean | BranchesDefaultArgs<ExtArgs>
    forked_branches?: boolean | Block$forked_branchesArgs<ExtArgs>
    _count?: boolean | BlockCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    block_id?: boolean
    branch_id?: boolean
    user_content?: boolean
    ai_content?: boolean
    created_at?: boolean
    update_at?: boolean
    branch?: boolean | BranchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    block_id?: boolean
    branch_id?: boolean
    user_content?: boolean
    ai_content?: boolean
    created_at?: boolean
    update_at?: boolean
    branch?: boolean | BranchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectScalar = {
    block_id?: boolean
    branch_id?: boolean
    user_content?: boolean
    ai_content?: boolean
    created_at?: boolean
    update_at?: boolean
  }

  export type BlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"block_id" | "branch_id" | "user_content" | "ai_content" | "created_at" | "update_at", ExtArgs["result"]["block"]>
  export type BlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchesDefaultArgs<ExtArgs>
    forked_branches?: boolean | Block$forked_branchesArgs<ExtArgs>
    _count?: boolean | BlockCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchesDefaultArgs<ExtArgs>
  }
  export type BlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchesDefaultArgs<ExtArgs>
  }

  export type $BlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Block"
    objects: {
      branch: Prisma.$BranchesPayload<ExtArgs>
      forked_branches: Prisma.$BranchesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      block_id: string
      branch_id: string
      user_content: string
      ai_content: string
      created_at: Date
      update_at: Date
    }, ExtArgs["result"]["block"]>
    composites: {}
  }

  type BlockGetPayload<S extends boolean | null | undefined | BlockDefaultArgs> = $Result.GetResult<Prisma.$BlockPayload, S>

  type BlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlockCountAggregateInputType | true
    }

  export interface BlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Block'], meta: { name: 'Block' } }
    /**
     * Find zero or one Block that matches the filter.
     * @param {BlockFindUniqueArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockFindUniqueArgs>(args: SelectSubset<T, BlockFindUniqueArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Block that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlockFindUniqueOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Block that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockFindFirstArgs>(args?: SelectSubset<T, BlockFindFirstArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Block that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blocks
     * const blocks = await prisma.block.findMany()
     * 
     * // Get first 10 Blocks
     * const blocks = await prisma.block.findMany({ take: 10 })
     * 
     * // Only select the `block_id`
     * const blockWithBlock_idOnly = await prisma.block.findMany({ select: { block_id: true } })
     * 
     */
    findMany<T extends BlockFindManyArgs>(args?: SelectSubset<T, BlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Block.
     * @param {BlockCreateArgs} args - Arguments to create a Block.
     * @example
     * // Create one Block
     * const Block = await prisma.block.create({
     *   data: {
     *     // ... data to create a Block
     *   }
     * })
     * 
     */
    create<T extends BlockCreateArgs>(args: SelectSubset<T, BlockCreateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blocks.
     * @param {BlockCreateManyArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockCreateManyArgs>(args?: SelectSubset<T, BlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Blocks and returns the data saved in the database.
     * @param {BlockCreateManyAndReturnArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Blocks and only return the `block_id`
     * const blockWithBlock_idOnly = await prisma.block.createManyAndReturn({
     *   select: { block_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Block.
     * @param {BlockDeleteArgs} args - Arguments to delete one Block.
     * @example
     * // Delete one Block
     * const Block = await prisma.block.delete({
     *   where: {
     *     // ... filter to delete one Block
     *   }
     * })
     * 
     */
    delete<T extends BlockDeleteArgs>(args: SelectSubset<T, BlockDeleteArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Block.
     * @param {BlockUpdateArgs} args - Arguments to update one Block.
     * @example
     * // Update one Block
     * const block = await prisma.block.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockUpdateArgs>(args: SelectSubset<T, BlockUpdateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blocks.
     * @param {BlockDeleteManyArgs} args - Arguments to filter Blocks to delete.
     * @example
     * // Delete a few Blocks
     * const { count } = await prisma.block.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockDeleteManyArgs>(args?: SelectSubset<T, BlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockUpdateManyArgs>(args: SelectSubset<T, BlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks and returns the data updated in the database.
     * @param {BlockUpdateManyAndReturnArgs} args - Arguments to update many Blocks.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Blocks and only return the `block_id`
     * const blockWithBlock_idOnly = await prisma.block.updateManyAndReturn({
     *   select: { block_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlockUpdateManyAndReturnArgs>(args: SelectSubset<T, BlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Block.
     * @param {BlockUpsertArgs} args - Arguments to update or create a Block.
     * @example
     * // Update or create a Block
     * const block = await prisma.block.upsert({
     *   create: {
     *     // ... data to create a Block
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Block we want to update
     *   }
     * })
     */
    upsert<T extends BlockUpsertArgs>(args: SelectSubset<T, BlockUpsertArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockCountArgs} args - Arguments to filter Blocks to count.
     * @example
     * // Count the number of Blocks
     * const count = await prisma.block.count({
     *   where: {
     *     // ... the filter for the Blocks we want to count
     *   }
     * })
    **/
    count<T extends BlockCountArgs>(
      args?: Subset<T, BlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlockAggregateArgs>(args: Subset<T, BlockAggregateArgs>): Prisma.PrismaPromise<GetBlockAggregateType<T>>

    /**
     * Group by Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockGroupByArgs['orderBy'] }
        : { orderBy?: BlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Block model
   */
  readonly fields: BlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Block.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends BranchesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchesDefaultArgs<ExtArgs>>): Prisma__BranchesClient<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    forked_branches<T extends Block$forked_branchesArgs<ExtArgs> = {}>(args?: Subset<T, Block$forked_branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Block model
   */
  interface BlockFieldRefs {
    readonly block_id: FieldRef<"Block", 'String'>
    readonly branch_id: FieldRef<"Block", 'String'>
    readonly user_content: FieldRef<"Block", 'String'>
    readonly ai_content: FieldRef<"Block", 'String'>
    readonly created_at: FieldRef<"Block", 'DateTime'>
    readonly update_at: FieldRef<"Block", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Block findUnique
   */
  export type BlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findUniqueOrThrow
   */
  export type BlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findFirst
   */
  export type BlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findFirstOrThrow
   */
  export type BlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findMany
   */
  export type BlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Blocks to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block create
   */
  export type BlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to create a Block.
     */
    data: XOR<BlockCreateInput, BlockUncheckedCreateInput>
  }

  /**
   * Block createMany
   */
  export type BlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Block createManyAndReturn
   */
  export type BlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block update
   */
  export type BlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to update a Block.
     */
    data: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
    /**
     * Choose, which Block to update.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block updateMany
   */
  export type BlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to update.
     */
    limit?: number
  }

  /**
   * Block updateManyAndReturn
   */
  export type BlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block upsert
   */
  export type BlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The filter to search for the Block to update in case it exists.
     */
    where: BlockWhereUniqueInput
    /**
     * In case the Block found by the `where` argument doesn't exist, create a new Block with this data.
     */
    create: XOR<BlockCreateInput, BlockUncheckedCreateInput>
    /**
     * In case the Block was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
  }

  /**
   * Block delete
   */
  export type BlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter which Block to delete.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block deleteMany
   */
  export type BlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blocks to delete
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to delete.
     */
    limit?: number
  }

  /**
   * Block.forked_branches
   */
  export type Block$forked_branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branches
     */
    select?: BranchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branches
     */
    omit?: BranchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchesInclude<ExtArgs> | null
    where?: BranchesWhereInput
    orderBy?: BranchesOrderByWithRelationInput | BranchesOrderByWithRelationInput[]
    cursor?: BranchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * Block without action
   */
  export type BlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    clerk_id: 'clerk_id',
    name: 'name',
    email: 'email',
    created_at: 'created_at',
    update_at: 'update_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const ChatlistScalarFieldEnum: {
    chat_id: 'chat_id',
    user_id: 'user_id',
    is_pinned: 'is_pinned',
    chat_title: 'chat_title',
    created_at: 'created_at',
    update_at: 'update_at'
  };

  export type ChatlistScalarFieldEnum = (typeof ChatlistScalarFieldEnum)[keyof typeof ChatlistScalarFieldEnum]


  export const BranchesScalarFieldEnum: {
    branch_id: 'branch_id',
    chat_id: 'chat_id',
    parent_branch_id: 'parent_branch_id',
    parent_block_id: 'parent_block_id',
    branch_title: 'branch_title',
    status: 'status',
    depth: 'depth',
    created_at: 'created_at',
    update_at: 'update_at'
  };

  export type BranchesScalarFieldEnum = (typeof BranchesScalarFieldEnum)[keyof typeof BranchesScalarFieldEnum]


  export const BlockScalarFieldEnum: {
    block_id: 'block_id',
    branch_id: 'branch_id',
    user_content: 'user_content',
    ai_content: 'ai_content',
    created_at: 'created_at',
    update_at: 'update_at'
  };

  export type BlockScalarFieldEnum = (typeof BlockScalarFieldEnum)[keyof typeof BlockScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    user_id?: UuidFilter<"Users"> | string
    clerk_id?: StringFilter<"Users"> | string
    name?: StringFilter<"Users"> | string
    email?: StringFilter<"Users"> | string
    created_at?: DateTimeFilter<"Users"> | Date | string
    update_at?: DateTimeFilter<"Users"> | Date | string
    chatlists?: ChatlistListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    user_id?: SortOrder
    clerk_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    chatlists?: ChatlistOrderByRelationAggregateInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    clerk_id?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    name?: StringFilter<"Users"> | string
    email?: StringFilter<"Users"> | string
    created_at?: DateTimeFilter<"Users"> | Date | string
    update_at?: DateTimeFilter<"Users"> | Date | string
    chatlists?: ChatlistListRelationFilter
  }, "user_id" | "clerk_id">

  export type UsersOrderByWithAggregationInput = {
    user_id?: SortOrder
    clerk_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"Users"> | string
    clerk_id?: StringWithAggregatesFilter<"Users"> | string
    name?: StringWithAggregatesFilter<"Users"> | string
    email?: StringWithAggregatesFilter<"Users"> | string
    created_at?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Users"> | Date | string
  }

  export type ChatlistWhereInput = {
    AND?: ChatlistWhereInput | ChatlistWhereInput[]
    OR?: ChatlistWhereInput[]
    NOT?: ChatlistWhereInput | ChatlistWhereInput[]
    chat_id?: UuidFilter<"Chatlist"> | string
    user_id?: UuidFilter<"Chatlist"> | string
    is_pinned?: BoolFilter<"Chatlist"> | boolean
    chat_title?: StringFilter<"Chatlist"> | string
    created_at?: DateTimeFilter<"Chatlist"> | Date | string
    update_at?: DateTimeFilter<"Chatlist"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    branches?: BranchesListRelationFilter
  }

  export type ChatlistOrderByWithRelationInput = {
    chat_id?: SortOrder
    user_id?: SortOrder
    is_pinned?: SortOrder
    chat_title?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    user?: UsersOrderByWithRelationInput
    branches?: BranchesOrderByRelationAggregateInput
  }

  export type ChatlistWhereUniqueInput = Prisma.AtLeast<{
    chat_id?: string
    AND?: ChatlistWhereInput | ChatlistWhereInput[]
    OR?: ChatlistWhereInput[]
    NOT?: ChatlistWhereInput | ChatlistWhereInput[]
    user_id?: UuidFilter<"Chatlist"> | string
    is_pinned?: BoolFilter<"Chatlist"> | boolean
    chat_title?: StringFilter<"Chatlist"> | string
    created_at?: DateTimeFilter<"Chatlist"> | Date | string
    update_at?: DateTimeFilter<"Chatlist"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    branches?: BranchesListRelationFilter
  }, "chat_id">

  export type ChatlistOrderByWithAggregationInput = {
    chat_id?: SortOrder
    user_id?: SortOrder
    is_pinned?: SortOrder
    chat_title?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    _count?: ChatlistCountOrderByAggregateInput
    _max?: ChatlistMaxOrderByAggregateInput
    _min?: ChatlistMinOrderByAggregateInput
  }

  export type ChatlistScalarWhereWithAggregatesInput = {
    AND?: ChatlistScalarWhereWithAggregatesInput | ChatlistScalarWhereWithAggregatesInput[]
    OR?: ChatlistScalarWhereWithAggregatesInput[]
    NOT?: ChatlistScalarWhereWithAggregatesInput | ChatlistScalarWhereWithAggregatesInput[]
    chat_id?: UuidWithAggregatesFilter<"Chatlist"> | string
    user_id?: UuidWithAggregatesFilter<"Chatlist"> | string
    is_pinned?: BoolWithAggregatesFilter<"Chatlist"> | boolean
    chat_title?: StringWithAggregatesFilter<"Chatlist"> | string
    created_at?: DateTimeWithAggregatesFilter<"Chatlist"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Chatlist"> | Date | string
  }

  export type BranchesWhereInput = {
    AND?: BranchesWhereInput | BranchesWhereInput[]
    OR?: BranchesWhereInput[]
    NOT?: BranchesWhereInput | BranchesWhereInput[]
    branch_id?: UuidFilter<"Branches"> | string
    chat_id?: UuidFilter<"Branches"> | string
    parent_branch_id?: UuidNullableFilter<"Branches"> | string | null
    parent_block_id?: UuidNullableFilter<"Branches"> | string | null
    branch_title?: StringFilter<"Branches"> | string
    status?: StringFilter<"Branches"> | string
    depth?: IntFilter<"Branches"> | number
    created_at?: DateTimeFilter<"Branches"> | Date | string
    update_at?: DateTimeFilter<"Branches"> | Date | string
    chat?: XOR<ChatlistScalarRelationFilter, ChatlistWhereInput>
    parent_branch?: XOR<BranchesNullableScalarRelationFilter, BranchesWhereInput> | null
    child_branches?: BranchesListRelationFilter
    parent_block?: XOR<BlockNullableScalarRelationFilter, BlockWhereInput> | null
    blocks?: BlockListRelationFilter
  }

  export type BranchesOrderByWithRelationInput = {
    branch_id?: SortOrder
    chat_id?: SortOrder
    parent_branch_id?: SortOrderInput | SortOrder
    parent_block_id?: SortOrderInput | SortOrder
    branch_title?: SortOrder
    status?: SortOrder
    depth?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    chat?: ChatlistOrderByWithRelationInput
    parent_branch?: BranchesOrderByWithRelationInput
    child_branches?: BranchesOrderByRelationAggregateInput
    parent_block?: BlockOrderByWithRelationInput
    blocks?: BlockOrderByRelationAggregateInput
  }

  export type BranchesWhereUniqueInput = Prisma.AtLeast<{
    branch_id?: string
    AND?: BranchesWhereInput | BranchesWhereInput[]
    OR?: BranchesWhereInput[]
    NOT?: BranchesWhereInput | BranchesWhereInput[]
    chat_id?: UuidFilter<"Branches"> | string
    parent_branch_id?: UuidNullableFilter<"Branches"> | string | null
    parent_block_id?: UuidNullableFilter<"Branches"> | string | null
    branch_title?: StringFilter<"Branches"> | string
    status?: StringFilter<"Branches"> | string
    depth?: IntFilter<"Branches"> | number
    created_at?: DateTimeFilter<"Branches"> | Date | string
    update_at?: DateTimeFilter<"Branches"> | Date | string
    chat?: XOR<ChatlistScalarRelationFilter, ChatlistWhereInput>
    parent_branch?: XOR<BranchesNullableScalarRelationFilter, BranchesWhereInput> | null
    child_branches?: BranchesListRelationFilter
    parent_block?: XOR<BlockNullableScalarRelationFilter, BlockWhereInput> | null
    blocks?: BlockListRelationFilter
  }, "branch_id">

  export type BranchesOrderByWithAggregationInput = {
    branch_id?: SortOrder
    chat_id?: SortOrder
    parent_branch_id?: SortOrderInput | SortOrder
    parent_block_id?: SortOrderInput | SortOrder
    branch_title?: SortOrder
    status?: SortOrder
    depth?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    _count?: BranchesCountOrderByAggregateInput
    _avg?: BranchesAvgOrderByAggregateInput
    _max?: BranchesMaxOrderByAggregateInput
    _min?: BranchesMinOrderByAggregateInput
    _sum?: BranchesSumOrderByAggregateInput
  }

  export type BranchesScalarWhereWithAggregatesInput = {
    AND?: BranchesScalarWhereWithAggregatesInput | BranchesScalarWhereWithAggregatesInput[]
    OR?: BranchesScalarWhereWithAggregatesInput[]
    NOT?: BranchesScalarWhereWithAggregatesInput | BranchesScalarWhereWithAggregatesInput[]
    branch_id?: UuidWithAggregatesFilter<"Branches"> | string
    chat_id?: UuidWithAggregatesFilter<"Branches"> | string
    parent_branch_id?: UuidNullableWithAggregatesFilter<"Branches"> | string | null
    parent_block_id?: UuidNullableWithAggregatesFilter<"Branches"> | string | null
    branch_title?: StringWithAggregatesFilter<"Branches"> | string
    status?: StringWithAggregatesFilter<"Branches"> | string
    depth?: IntWithAggregatesFilter<"Branches"> | number
    created_at?: DateTimeWithAggregatesFilter<"Branches"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Branches"> | Date | string
  }

  export type BlockWhereInput = {
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    block_id?: UuidFilter<"Block"> | string
    branch_id?: UuidFilter<"Block"> | string
    user_content?: StringFilter<"Block"> | string
    ai_content?: StringFilter<"Block"> | string
    created_at?: DateTimeFilter<"Block"> | Date | string
    update_at?: DateTimeFilter<"Block"> | Date | string
    branch?: XOR<BranchesScalarRelationFilter, BranchesWhereInput>
    forked_branches?: BranchesListRelationFilter
  }

  export type BlockOrderByWithRelationInput = {
    block_id?: SortOrder
    branch_id?: SortOrder
    user_content?: SortOrder
    ai_content?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    branch?: BranchesOrderByWithRelationInput
    forked_branches?: BranchesOrderByRelationAggregateInput
  }

  export type BlockWhereUniqueInput = Prisma.AtLeast<{
    block_id?: string
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    branch_id?: UuidFilter<"Block"> | string
    user_content?: StringFilter<"Block"> | string
    ai_content?: StringFilter<"Block"> | string
    created_at?: DateTimeFilter<"Block"> | Date | string
    update_at?: DateTimeFilter<"Block"> | Date | string
    branch?: XOR<BranchesScalarRelationFilter, BranchesWhereInput>
    forked_branches?: BranchesListRelationFilter
  }, "block_id">

  export type BlockOrderByWithAggregationInput = {
    block_id?: SortOrder
    branch_id?: SortOrder
    user_content?: SortOrder
    ai_content?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
    _count?: BlockCountOrderByAggregateInput
    _max?: BlockMaxOrderByAggregateInput
    _min?: BlockMinOrderByAggregateInput
  }

  export type BlockScalarWhereWithAggregatesInput = {
    AND?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    OR?: BlockScalarWhereWithAggregatesInput[]
    NOT?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    block_id?: UuidWithAggregatesFilter<"Block"> | string
    branch_id?: UuidWithAggregatesFilter<"Block"> | string
    user_content?: StringWithAggregatesFilter<"Block"> | string
    ai_content?: StringWithAggregatesFilter<"Block"> | string
    created_at?: DateTimeWithAggregatesFilter<"Block"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Block"> | Date | string
  }

  export type UsersCreateInput = {
    user_id?: string
    clerk_id: string
    name: string
    email: string
    created_at?: Date | string
    update_at?: Date | string
    chatlists?: ChatlistCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateInput = {
    user_id?: string
    clerk_id: string
    name: string
    email: string
    created_at?: Date | string
    update_at?: Date | string
    chatlists?: ChatlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chatlists?: ChatlistUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chatlists?: ChatlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsersCreateManyInput = {
    user_id?: string
    clerk_id: string
    name: string
    email: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type UsersUpdateManyMutationInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatlistCreateInput = {
    chat_id?: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
    user: UsersCreateNestedOneWithoutChatlistsInput
    branches?: BranchesCreateNestedManyWithoutChatInput
  }

  export type ChatlistUncheckedCreateInput = {
    chat_id?: string
    user_id: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
    branches?: BranchesUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatlistUpdateInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutChatlistsNestedInput
    branches?: BranchesUpdateManyWithoutChatNestedInput
  }

  export type ChatlistUncheckedUpdateInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: BranchesUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatlistCreateManyInput = {
    chat_id?: string
    user_id: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type ChatlistUpdateManyMutationInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatlistUncheckedUpdateManyInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesCreateInput = {
    branch_id?: string
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    chat: ChatlistCreateNestedOneWithoutBranchesInput
    parent_branch?: BranchesCreateNestedOneWithoutChild_branchesInput
    child_branches?: BranchesCreateNestedManyWithoutParent_branchInput
    parent_block?: BlockCreateNestedOneWithoutForked_branchesInput
    blocks?: BlockCreateNestedManyWithoutBranchInput
  }

  export type BranchesUncheckedCreateInput = {
    branch_id?: string
    chat_id: string
    parent_branch_id?: string | null
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    child_branches?: BranchesUncheckedCreateNestedManyWithoutParent_branchInput
    blocks?: BlockUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchesUpdateInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatlistUpdateOneRequiredWithoutBranchesNestedInput
    parent_branch?: BranchesUpdateOneWithoutChild_branchesNestedInput
    child_branches?: BranchesUpdateManyWithoutParent_branchNestedInput
    parent_block?: BlockUpdateOneWithoutForked_branchesNestedInput
    blocks?: BlockUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    child_branches?: BranchesUncheckedUpdateManyWithoutParent_branchNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchesCreateManyInput = {
    branch_id?: string
    chat_id: string
    parent_branch_id?: string | null
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BranchesUpdateManyMutationInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesUncheckedUpdateManyInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockCreateInput = {
    block_id?: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
    branch: BranchesCreateNestedOneWithoutBlocksInput
    forked_branches?: BranchesCreateNestedManyWithoutParent_blockInput
  }

  export type BlockUncheckedCreateInput = {
    block_id?: string
    branch_id: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
    forked_branches?: BranchesUncheckedCreateNestedManyWithoutParent_blockInput
  }

  export type BlockUpdateInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchesUpdateOneRequiredWithoutBlocksNestedInput
    forked_branches?: BranchesUpdateManyWithoutParent_blockNestedInput
  }

  export type BlockUncheckedUpdateInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    branch_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    forked_branches?: BranchesUncheckedUpdateManyWithoutParent_blockNestedInput
  }

  export type BlockCreateManyInput = {
    block_id?: string
    branch_id: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BlockUpdateManyMutationInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    branch_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChatlistListRelationFilter = {
    every?: ChatlistWhereInput
    some?: ChatlistWhereInput
    none?: ChatlistWhereInput
  }

  export type ChatlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersCountOrderByAggregateInput = {
    user_id?: SortOrder
    clerk_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    clerk_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    user_id?: SortOrder
    clerk_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UsersScalarRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type BranchesListRelationFilter = {
    every?: BranchesWhereInput
    some?: BranchesWhereInput
    none?: BranchesWhereInput
  }

  export type BranchesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatlistCountOrderByAggregateInput = {
    chat_id?: SortOrder
    user_id?: SortOrder
    is_pinned?: SortOrder
    chat_title?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type ChatlistMaxOrderByAggregateInput = {
    chat_id?: SortOrder
    user_id?: SortOrder
    is_pinned?: SortOrder
    chat_title?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type ChatlistMinOrderByAggregateInput = {
    chat_id?: SortOrder
    user_id?: SortOrder
    is_pinned?: SortOrder
    chat_title?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ChatlistScalarRelationFilter = {
    is?: ChatlistWhereInput
    isNot?: ChatlistWhereInput
  }

  export type BranchesNullableScalarRelationFilter = {
    is?: BranchesWhereInput | null
    isNot?: BranchesWhereInput | null
  }

  export type BlockNullableScalarRelationFilter = {
    is?: BlockWhereInput | null
    isNot?: BlockWhereInput | null
  }

  export type BlockListRelationFilter = {
    every?: BlockWhereInput
    some?: BlockWhereInput
    none?: BlockWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchesCountOrderByAggregateInput = {
    branch_id?: SortOrder
    chat_id?: SortOrder
    parent_branch_id?: SortOrder
    parent_block_id?: SortOrder
    branch_title?: SortOrder
    status?: SortOrder
    depth?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type BranchesAvgOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type BranchesMaxOrderByAggregateInput = {
    branch_id?: SortOrder
    chat_id?: SortOrder
    parent_branch_id?: SortOrder
    parent_block_id?: SortOrder
    branch_title?: SortOrder
    status?: SortOrder
    depth?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type BranchesMinOrderByAggregateInput = {
    branch_id?: SortOrder
    chat_id?: SortOrder
    parent_branch_id?: SortOrder
    parent_block_id?: SortOrder
    branch_title?: SortOrder
    status?: SortOrder
    depth?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type BranchesSumOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BranchesScalarRelationFilter = {
    is?: BranchesWhereInput
    isNot?: BranchesWhereInput
  }

  export type BlockCountOrderByAggregateInput = {
    block_id?: SortOrder
    branch_id?: SortOrder
    user_content?: SortOrder
    ai_content?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type BlockMaxOrderByAggregateInput = {
    block_id?: SortOrder
    branch_id?: SortOrder
    user_content?: SortOrder
    ai_content?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type BlockMinOrderByAggregateInput = {
    block_id?: SortOrder
    branch_id?: SortOrder
    user_content?: SortOrder
    ai_content?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type ChatlistCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatlistCreateWithoutUserInput, ChatlistUncheckedCreateWithoutUserInput> | ChatlistCreateWithoutUserInput[] | ChatlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatlistCreateOrConnectWithoutUserInput | ChatlistCreateOrConnectWithoutUserInput[]
    createMany?: ChatlistCreateManyUserInputEnvelope
    connect?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
  }

  export type ChatlistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatlistCreateWithoutUserInput, ChatlistUncheckedCreateWithoutUserInput> | ChatlistCreateWithoutUserInput[] | ChatlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatlistCreateOrConnectWithoutUserInput | ChatlistCreateOrConnectWithoutUserInput[]
    createMany?: ChatlistCreateManyUserInputEnvelope
    connect?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChatlistUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatlistCreateWithoutUserInput, ChatlistUncheckedCreateWithoutUserInput> | ChatlistCreateWithoutUserInput[] | ChatlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatlistCreateOrConnectWithoutUserInput | ChatlistCreateOrConnectWithoutUserInput[]
    upsert?: ChatlistUpsertWithWhereUniqueWithoutUserInput | ChatlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatlistCreateManyUserInputEnvelope
    set?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    disconnect?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    delete?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    connect?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    update?: ChatlistUpdateWithWhereUniqueWithoutUserInput | ChatlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatlistUpdateManyWithWhereWithoutUserInput | ChatlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatlistScalarWhereInput | ChatlistScalarWhereInput[]
  }

  export type ChatlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatlistCreateWithoutUserInput, ChatlistUncheckedCreateWithoutUserInput> | ChatlistCreateWithoutUserInput[] | ChatlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatlistCreateOrConnectWithoutUserInput | ChatlistCreateOrConnectWithoutUserInput[]
    upsert?: ChatlistUpsertWithWhereUniqueWithoutUserInput | ChatlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatlistCreateManyUserInputEnvelope
    set?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    disconnect?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    delete?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    connect?: ChatlistWhereUniqueInput | ChatlistWhereUniqueInput[]
    update?: ChatlistUpdateWithWhereUniqueWithoutUserInput | ChatlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatlistUpdateManyWithWhereWithoutUserInput | ChatlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatlistScalarWhereInput | ChatlistScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutChatlistsInput = {
    create?: XOR<UsersCreateWithoutChatlistsInput, UsersUncheckedCreateWithoutChatlistsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutChatlistsInput
    connect?: UsersWhereUniqueInput
  }

  export type BranchesCreateNestedManyWithoutChatInput = {
    create?: XOR<BranchesCreateWithoutChatInput, BranchesUncheckedCreateWithoutChatInput> | BranchesCreateWithoutChatInput[] | BranchesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutChatInput | BranchesCreateOrConnectWithoutChatInput[]
    createMany?: BranchesCreateManyChatInputEnvelope
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
  }

  export type BranchesUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<BranchesCreateWithoutChatInput, BranchesUncheckedCreateWithoutChatInput> | BranchesCreateWithoutChatInput[] | BranchesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutChatInput | BranchesCreateOrConnectWithoutChatInput[]
    createMany?: BranchesCreateManyChatInputEnvelope
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UsersUpdateOneRequiredWithoutChatlistsNestedInput = {
    create?: XOR<UsersCreateWithoutChatlistsInput, UsersUncheckedCreateWithoutChatlistsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutChatlistsInput
    upsert?: UsersUpsertWithoutChatlistsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutChatlistsInput, UsersUpdateWithoutChatlistsInput>, UsersUncheckedUpdateWithoutChatlistsInput>
  }

  export type BranchesUpdateManyWithoutChatNestedInput = {
    create?: XOR<BranchesCreateWithoutChatInput, BranchesUncheckedCreateWithoutChatInput> | BranchesCreateWithoutChatInput[] | BranchesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutChatInput | BranchesCreateOrConnectWithoutChatInput[]
    upsert?: BranchesUpsertWithWhereUniqueWithoutChatInput | BranchesUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: BranchesCreateManyChatInputEnvelope
    set?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    disconnect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    delete?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    update?: BranchesUpdateWithWhereUniqueWithoutChatInput | BranchesUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: BranchesUpdateManyWithWhereWithoutChatInput | BranchesUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
  }

  export type BranchesUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<BranchesCreateWithoutChatInput, BranchesUncheckedCreateWithoutChatInput> | BranchesCreateWithoutChatInput[] | BranchesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutChatInput | BranchesCreateOrConnectWithoutChatInput[]
    upsert?: BranchesUpsertWithWhereUniqueWithoutChatInput | BranchesUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: BranchesCreateManyChatInputEnvelope
    set?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    disconnect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    delete?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    update?: BranchesUpdateWithWhereUniqueWithoutChatInput | BranchesUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: BranchesUpdateManyWithWhereWithoutChatInput | BranchesUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
  }

  export type ChatlistCreateNestedOneWithoutBranchesInput = {
    create?: XOR<ChatlistCreateWithoutBranchesInput, ChatlistUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: ChatlistCreateOrConnectWithoutBranchesInput
    connect?: ChatlistWhereUniqueInput
  }

  export type BranchesCreateNestedOneWithoutChild_branchesInput = {
    create?: XOR<BranchesCreateWithoutChild_branchesInput, BranchesUncheckedCreateWithoutChild_branchesInput>
    connectOrCreate?: BranchesCreateOrConnectWithoutChild_branchesInput
    connect?: BranchesWhereUniqueInput
  }

  export type BranchesCreateNestedManyWithoutParent_branchInput = {
    create?: XOR<BranchesCreateWithoutParent_branchInput, BranchesUncheckedCreateWithoutParent_branchInput> | BranchesCreateWithoutParent_branchInput[] | BranchesUncheckedCreateWithoutParent_branchInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_branchInput | BranchesCreateOrConnectWithoutParent_branchInput[]
    createMany?: BranchesCreateManyParent_branchInputEnvelope
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
  }

  export type BlockCreateNestedOneWithoutForked_branchesInput = {
    create?: XOR<BlockCreateWithoutForked_branchesInput, BlockUncheckedCreateWithoutForked_branchesInput>
    connectOrCreate?: BlockCreateOrConnectWithoutForked_branchesInput
    connect?: BlockWhereUniqueInput
  }

  export type BlockCreateNestedManyWithoutBranchInput = {
    create?: XOR<BlockCreateWithoutBranchInput, BlockUncheckedCreateWithoutBranchInput> | BlockCreateWithoutBranchInput[] | BlockUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBranchInput | BlockCreateOrConnectWithoutBranchInput[]
    createMany?: BlockCreateManyBranchInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type BranchesUncheckedCreateNestedManyWithoutParent_branchInput = {
    create?: XOR<BranchesCreateWithoutParent_branchInput, BranchesUncheckedCreateWithoutParent_branchInput> | BranchesCreateWithoutParent_branchInput[] | BranchesUncheckedCreateWithoutParent_branchInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_branchInput | BranchesCreateOrConnectWithoutParent_branchInput[]
    createMany?: BranchesCreateManyParent_branchInputEnvelope
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
  }

  export type BlockUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<BlockCreateWithoutBranchInput, BlockUncheckedCreateWithoutBranchInput> | BlockCreateWithoutBranchInput[] | BlockUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBranchInput | BlockCreateOrConnectWithoutBranchInput[]
    createMany?: BlockCreateManyBranchInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChatlistUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<ChatlistCreateWithoutBranchesInput, ChatlistUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: ChatlistCreateOrConnectWithoutBranchesInput
    upsert?: ChatlistUpsertWithoutBranchesInput
    connect?: ChatlistWhereUniqueInput
    update?: XOR<XOR<ChatlistUpdateToOneWithWhereWithoutBranchesInput, ChatlistUpdateWithoutBranchesInput>, ChatlistUncheckedUpdateWithoutBranchesInput>
  }

  export type BranchesUpdateOneWithoutChild_branchesNestedInput = {
    create?: XOR<BranchesCreateWithoutChild_branchesInput, BranchesUncheckedCreateWithoutChild_branchesInput>
    connectOrCreate?: BranchesCreateOrConnectWithoutChild_branchesInput
    upsert?: BranchesUpsertWithoutChild_branchesInput
    disconnect?: BranchesWhereInput | boolean
    delete?: BranchesWhereInput | boolean
    connect?: BranchesWhereUniqueInput
    update?: XOR<XOR<BranchesUpdateToOneWithWhereWithoutChild_branchesInput, BranchesUpdateWithoutChild_branchesInput>, BranchesUncheckedUpdateWithoutChild_branchesInput>
  }

  export type BranchesUpdateManyWithoutParent_branchNestedInput = {
    create?: XOR<BranchesCreateWithoutParent_branchInput, BranchesUncheckedCreateWithoutParent_branchInput> | BranchesCreateWithoutParent_branchInput[] | BranchesUncheckedCreateWithoutParent_branchInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_branchInput | BranchesCreateOrConnectWithoutParent_branchInput[]
    upsert?: BranchesUpsertWithWhereUniqueWithoutParent_branchInput | BranchesUpsertWithWhereUniqueWithoutParent_branchInput[]
    createMany?: BranchesCreateManyParent_branchInputEnvelope
    set?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    disconnect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    delete?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    update?: BranchesUpdateWithWhereUniqueWithoutParent_branchInput | BranchesUpdateWithWhereUniqueWithoutParent_branchInput[]
    updateMany?: BranchesUpdateManyWithWhereWithoutParent_branchInput | BranchesUpdateManyWithWhereWithoutParent_branchInput[]
    deleteMany?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
  }

  export type BlockUpdateOneWithoutForked_branchesNestedInput = {
    create?: XOR<BlockCreateWithoutForked_branchesInput, BlockUncheckedCreateWithoutForked_branchesInput>
    connectOrCreate?: BlockCreateOrConnectWithoutForked_branchesInput
    upsert?: BlockUpsertWithoutForked_branchesInput
    disconnect?: BlockWhereInput | boolean
    delete?: BlockWhereInput | boolean
    connect?: BlockWhereUniqueInput
    update?: XOR<XOR<BlockUpdateToOneWithWhereWithoutForked_branchesInput, BlockUpdateWithoutForked_branchesInput>, BlockUncheckedUpdateWithoutForked_branchesInput>
  }

  export type BlockUpdateManyWithoutBranchNestedInput = {
    create?: XOR<BlockCreateWithoutBranchInput, BlockUncheckedCreateWithoutBranchInput> | BlockCreateWithoutBranchInput[] | BlockUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBranchInput | BlockCreateOrConnectWithoutBranchInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutBranchInput | BlockUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: BlockCreateManyBranchInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutBranchInput | BlockUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutBranchInput | BlockUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BranchesUncheckedUpdateManyWithoutParent_branchNestedInput = {
    create?: XOR<BranchesCreateWithoutParent_branchInput, BranchesUncheckedCreateWithoutParent_branchInput> | BranchesCreateWithoutParent_branchInput[] | BranchesUncheckedCreateWithoutParent_branchInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_branchInput | BranchesCreateOrConnectWithoutParent_branchInput[]
    upsert?: BranchesUpsertWithWhereUniqueWithoutParent_branchInput | BranchesUpsertWithWhereUniqueWithoutParent_branchInput[]
    createMany?: BranchesCreateManyParent_branchInputEnvelope
    set?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    disconnect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    delete?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    update?: BranchesUpdateWithWhereUniqueWithoutParent_branchInput | BranchesUpdateWithWhereUniqueWithoutParent_branchInput[]
    updateMany?: BranchesUpdateManyWithWhereWithoutParent_branchInput | BranchesUpdateManyWithWhereWithoutParent_branchInput[]
    deleteMany?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
  }

  export type BlockUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<BlockCreateWithoutBranchInput, BlockUncheckedCreateWithoutBranchInput> | BlockCreateWithoutBranchInput[] | BlockUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBranchInput | BlockCreateOrConnectWithoutBranchInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutBranchInput | BlockUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: BlockCreateManyBranchInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutBranchInput | BlockUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutBranchInput | BlockUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type BranchesCreateNestedOneWithoutBlocksInput = {
    create?: XOR<BranchesCreateWithoutBlocksInput, BranchesUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: BranchesCreateOrConnectWithoutBlocksInput
    connect?: BranchesWhereUniqueInput
  }

  export type BranchesCreateNestedManyWithoutParent_blockInput = {
    create?: XOR<BranchesCreateWithoutParent_blockInput, BranchesUncheckedCreateWithoutParent_blockInput> | BranchesCreateWithoutParent_blockInput[] | BranchesUncheckedCreateWithoutParent_blockInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_blockInput | BranchesCreateOrConnectWithoutParent_blockInput[]
    createMany?: BranchesCreateManyParent_blockInputEnvelope
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
  }

  export type BranchesUncheckedCreateNestedManyWithoutParent_blockInput = {
    create?: XOR<BranchesCreateWithoutParent_blockInput, BranchesUncheckedCreateWithoutParent_blockInput> | BranchesCreateWithoutParent_blockInput[] | BranchesUncheckedCreateWithoutParent_blockInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_blockInput | BranchesCreateOrConnectWithoutParent_blockInput[]
    createMany?: BranchesCreateManyParent_blockInputEnvelope
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
  }

  export type BranchesUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<BranchesCreateWithoutBlocksInput, BranchesUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: BranchesCreateOrConnectWithoutBlocksInput
    upsert?: BranchesUpsertWithoutBlocksInput
    connect?: BranchesWhereUniqueInput
    update?: XOR<XOR<BranchesUpdateToOneWithWhereWithoutBlocksInput, BranchesUpdateWithoutBlocksInput>, BranchesUncheckedUpdateWithoutBlocksInput>
  }

  export type BranchesUpdateManyWithoutParent_blockNestedInput = {
    create?: XOR<BranchesCreateWithoutParent_blockInput, BranchesUncheckedCreateWithoutParent_blockInput> | BranchesCreateWithoutParent_blockInput[] | BranchesUncheckedCreateWithoutParent_blockInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_blockInput | BranchesCreateOrConnectWithoutParent_blockInput[]
    upsert?: BranchesUpsertWithWhereUniqueWithoutParent_blockInput | BranchesUpsertWithWhereUniqueWithoutParent_blockInput[]
    createMany?: BranchesCreateManyParent_blockInputEnvelope
    set?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    disconnect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    delete?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    update?: BranchesUpdateWithWhereUniqueWithoutParent_blockInput | BranchesUpdateWithWhereUniqueWithoutParent_blockInput[]
    updateMany?: BranchesUpdateManyWithWhereWithoutParent_blockInput | BranchesUpdateManyWithWhereWithoutParent_blockInput[]
    deleteMany?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
  }

  export type BranchesUncheckedUpdateManyWithoutParent_blockNestedInput = {
    create?: XOR<BranchesCreateWithoutParent_blockInput, BranchesUncheckedCreateWithoutParent_blockInput> | BranchesCreateWithoutParent_blockInput[] | BranchesUncheckedCreateWithoutParent_blockInput[]
    connectOrCreate?: BranchesCreateOrConnectWithoutParent_blockInput | BranchesCreateOrConnectWithoutParent_blockInput[]
    upsert?: BranchesUpsertWithWhereUniqueWithoutParent_blockInput | BranchesUpsertWithWhereUniqueWithoutParent_blockInput[]
    createMany?: BranchesCreateManyParent_blockInputEnvelope
    set?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    disconnect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    delete?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    connect?: BranchesWhereUniqueInput | BranchesWhereUniqueInput[]
    update?: BranchesUpdateWithWhereUniqueWithoutParent_blockInput | BranchesUpdateWithWhereUniqueWithoutParent_blockInput[]
    updateMany?: BranchesUpdateManyWithWhereWithoutParent_blockInput | BranchesUpdateManyWithWhereWithoutParent_blockInput[]
    deleteMany?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ChatlistCreateWithoutUserInput = {
    chat_id?: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
    branches?: BranchesCreateNestedManyWithoutChatInput
  }

  export type ChatlistUncheckedCreateWithoutUserInput = {
    chat_id?: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
    branches?: BranchesUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatlistCreateOrConnectWithoutUserInput = {
    where: ChatlistWhereUniqueInput
    create: XOR<ChatlistCreateWithoutUserInput, ChatlistUncheckedCreateWithoutUserInput>
  }

  export type ChatlistCreateManyUserInputEnvelope = {
    data: ChatlistCreateManyUserInput | ChatlistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChatlistUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatlistWhereUniqueInput
    update: XOR<ChatlistUpdateWithoutUserInput, ChatlistUncheckedUpdateWithoutUserInput>
    create: XOR<ChatlistCreateWithoutUserInput, ChatlistUncheckedCreateWithoutUserInput>
  }

  export type ChatlistUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatlistWhereUniqueInput
    data: XOR<ChatlistUpdateWithoutUserInput, ChatlistUncheckedUpdateWithoutUserInput>
  }

  export type ChatlistUpdateManyWithWhereWithoutUserInput = {
    where: ChatlistScalarWhereInput
    data: XOR<ChatlistUpdateManyMutationInput, ChatlistUncheckedUpdateManyWithoutUserInput>
  }

  export type ChatlistScalarWhereInput = {
    AND?: ChatlistScalarWhereInput | ChatlistScalarWhereInput[]
    OR?: ChatlistScalarWhereInput[]
    NOT?: ChatlistScalarWhereInput | ChatlistScalarWhereInput[]
    chat_id?: UuidFilter<"Chatlist"> | string
    user_id?: UuidFilter<"Chatlist"> | string
    is_pinned?: BoolFilter<"Chatlist"> | boolean
    chat_title?: StringFilter<"Chatlist"> | string
    created_at?: DateTimeFilter<"Chatlist"> | Date | string
    update_at?: DateTimeFilter<"Chatlist"> | Date | string
  }

  export type UsersCreateWithoutChatlistsInput = {
    user_id?: string
    clerk_id: string
    name: string
    email: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type UsersUncheckedCreateWithoutChatlistsInput = {
    user_id?: string
    clerk_id: string
    name: string
    email: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type UsersCreateOrConnectWithoutChatlistsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutChatlistsInput, UsersUncheckedCreateWithoutChatlistsInput>
  }

  export type BranchesCreateWithoutChatInput = {
    branch_id?: string
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    parent_branch?: BranchesCreateNestedOneWithoutChild_branchesInput
    child_branches?: BranchesCreateNestedManyWithoutParent_branchInput
    parent_block?: BlockCreateNestedOneWithoutForked_branchesInput
    blocks?: BlockCreateNestedManyWithoutBranchInput
  }

  export type BranchesUncheckedCreateWithoutChatInput = {
    branch_id?: string
    parent_branch_id?: string | null
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    child_branches?: BranchesUncheckedCreateNestedManyWithoutParent_branchInput
    blocks?: BlockUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchesCreateOrConnectWithoutChatInput = {
    where: BranchesWhereUniqueInput
    create: XOR<BranchesCreateWithoutChatInput, BranchesUncheckedCreateWithoutChatInput>
  }

  export type BranchesCreateManyChatInputEnvelope = {
    data: BranchesCreateManyChatInput | BranchesCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type UsersUpsertWithoutChatlistsInput = {
    update: XOR<UsersUpdateWithoutChatlistsInput, UsersUncheckedUpdateWithoutChatlistsInput>
    create: XOR<UsersCreateWithoutChatlistsInput, UsersUncheckedCreateWithoutChatlistsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutChatlistsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutChatlistsInput, UsersUncheckedUpdateWithoutChatlistsInput>
  }

  export type UsersUpdateWithoutChatlistsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateWithoutChatlistsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesUpsertWithWhereUniqueWithoutChatInput = {
    where: BranchesWhereUniqueInput
    update: XOR<BranchesUpdateWithoutChatInput, BranchesUncheckedUpdateWithoutChatInput>
    create: XOR<BranchesCreateWithoutChatInput, BranchesUncheckedCreateWithoutChatInput>
  }

  export type BranchesUpdateWithWhereUniqueWithoutChatInput = {
    where: BranchesWhereUniqueInput
    data: XOR<BranchesUpdateWithoutChatInput, BranchesUncheckedUpdateWithoutChatInput>
  }

  export type BranchesUpdateManyWithWhereWithoutChatInput = {
    where: BranchesScalarWhereInput
    data: XOR<BranchesUpdateManyMutationInput, BranchesUncheckedUpdateManyWithoutChatInput>
  }

  export type BranchesScalarWhereInput = {
    AND?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
    OR?: BranchesScalarWhereInput[]
    NOT?: BranchesScalarWhereInput | BranchesScalarWhereInput[]
    branch_id?: UuidFilter<"Branches"> | string
    chat_id?: UuidFilter<"Branches"> | string
    parent_branch_id?: UuidNullableFilter<"Branches"> | string | null
    parent_block_id?: UuidNullableFilter<"Branches"> | string | null
    branch_title?: StringFilter<"Branches"> | string
    status?: StringFilter<"Branches"> | string
    depth?: IntFilter<"Branches"> | number
    created_at?: DateTimeFilter<"Branches"> | Date | string
    update_at?: DateTimeFilter<"Branches"> | Date | string
  }

  export type ChatlistCreateWithoutBranchesInput = {
    chat_id?: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
    user: UsersCreateNestedOneWithoutChatlistsInput
  }

  export type ChatlistUncheckedCreateWithoutBranchesInput = {
    chat_id?: string
    user_id: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type ChatlistCreateOrConnectWithoutBranchesInput = {
    where: ChatlistWhereUniqueInput
    create: XOR<ChatlistCreateWithoutBranchesInput, ChatlistUncheckedCreateWithoutBranchesInput>
  }

  export type BranchesCreateWithoutChild_branchesInput = {
    branch_id?: string
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    chat: ChatlistCreateNestedOneWithoutBranchesInput
    parent_branch?: BranchesCreateNestedOneWithoutChild_branchesInput
    parent_block?: BlockCreateNestedOneWithoutForked_branchesInput
    blocks?: BlockCreateNestedManyWithoutBranchInput
  }

  export type BranchesUncheckedCreateWithoutChild_branchesInput = {
    branch_id?: string
    chat_id: string
    parent_branch_id?: string | null
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    blocks?: BlockUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchesCreateOrConnectWithoutChild_branchesInput = {
    where: BranchesWhereUniqueInput
    create: XOR<BranchesCreateWithoutChild_branchesInput, BranchesUncheckedCreateWithoutChild_branchesInput>
  }

  export type BranchesCreateWithoutParent_branchInput = {
    branch_id?: string
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    chat: ChatlistCreateNestedOneWithoutBranchesInput
    child_branches?: BranchesCreateNestedManyWithoutParent_branchInput
    parent_block?: BlockCreateNestedOneWithoutForked_branchesInput
    blocks?: BlockCreateNestedManyWithoutBranchInput
  }

  export type BranchesUncheckedCreateWithoutParent_branchInput = {
    branch_id?: string
    chat_id: string
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    child_branches?: BranchesUncheckedCreateNestedManyWithoutParent_branchInput
    blocks?: BlockUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchesCreateOrConnectWithoutParent_branchInput = {
    where: BranchesWhereUniqueInput
    create: XOR<BranchesCreateWithoutParent_branchInput, BranchesUncheckedCreateWithoutParent_branchInput>
  }

  export type BranchesCreateManyParent_branchInputEnvelope = {
    data: BranchesCreateManyParent_branchInput | BranchesCreateManyParent_branchInput[]
    skipDuplicates?: boolean
  }

  export type BlockCreateWithoutForked_branchesInput = {
    block_id?: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
    branch: BranchesCreateNestedOneWithoutBlocksInput
  }

  export type BlockUncheckedCreateWithoutForked_branchesInput = {
    block_id?: string
    branch_id: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BlockCreateOrConnectWithoutForked_branchesInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutForked_branchesInput, BlockUncheckedCreateWithoutForked_branchesInput>
  }

  export type BlockCreateWithoutBranchInput = {
    block_id?: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
    forked_branches?: BranchesCreateNestedManyWithoutParent_blockInput
  }

  export type BlockUncheckedCreateWithoutBranchInput = {
    block_id?: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
    forked_branches?: BranchesUncheckedCreateNestedManyWithoutParent_blockInput
  }

  export type BlockCreateOrConnectWithoutBranchInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutBranchInput, BlockUncheckedCreateWithoutBranchInput>
  }

  export type BlockCreateManyBranchInputEnvelope = {
    data: BlockCreateManyBranchInput | BlockCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type ChatlistUpsertWithoutBranchesInput = {
    update: XOR<ChatlistUpdateWithoutBranchesInput, ChatlistUncheckedUpdateWithoutBranchesInput>
    create: XOR<ChatlistCreateWithoutBranchesInput, ChatlistUncheckedCreateWithoutBranchesInput>
    where?: ChatlistWhereInput
  }

  export type ChatlistUpdateToOneWithWhereWithoutBranchesInput = {
    where?: ChatlistWhereInput
    data: XOR<ChatlistUpdateWithoutBranchesInput, ChatlistUncheckedUpdateWithoutBranchesInput>
  }

  export type ChatlistUpdateWithoutBranchesInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutChatlistsNestedInput
  }

  export type ChatlistUncheckedUpdateWithoutBranchesInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesUpsertWithoutChild_branchesInput = {
    update: XOR<BranchesUpdateWithoutChild_branchesInput, BranchesUncheckedUpdateWithoutChild_branchesInput>
    create: XOR<BranchesCreateWithoutChild_branchesInput, BranchesUncheckedCreateWithoutChild_branchesInput>
    where?: BranchesWhereInput
  }

  export type BranchesUpdateToOneWithWhereWithoutChild_branchesInput = {
    where?: BranchesWhereInput
    data: XOR<BranchesUpdateWithoutChild_branchesInput, BranchesUncheckedUpdateWithoutChild_branchesInput>
  }

  export type BranchesUpdateWithoutChild_branchesInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatlistUpdateOneRequiredWithoutBranchesNestedInput
    parent_branch?: BranchesUpdateOneWithoutChild_branchesNestedInput
    parent_block?: BlockUpdateOneWithoutForked_branchesNestedInput
    blocks?: BlockUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateWithoutChild_branchesInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    blocks?: BlockUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUpsertWithWhereUniqueWithoutParent_branchInput = {
    where: BranchesWhereUniqueInput
    update: XOR<BranchesUpdateWithoutParent_branchInput, BranchesUncheckedUpdateWithoutParent_branchInput>
    create: XOR<BranchesCreateWithoutParent_branchInput, BranchesUncheckedCreateWithoutParent_branchInput>
  }

  export type BranchesUpdateWithWhereUniqueWithoutParent_branchInput = {
    where: BranchesWhereUniqueInput
    data: XOR<BranchesUpdateWithoutParent_branchInput, BranchesUncheckedUpdateWithoutParent_branchInput>
  }

  export type BranchesUpdateManyWithWhereWithoutParent_branchInput = {
    where: BranchesScalarWhereInput
    data: XOR<BranchesUpdateManyMutationInput, BranchesUncheckedUpdateManyWithoutParent_branchInput>
  }

  export type BlockUpsertWithoutForked_branchesInput = {
    update: XOR<BlockUpdateWithoutForked_branchesInput, BlockUncheckedUpdateWithoutForked_branchesInput>
    create: XOR<BlockCreateWithoutForked_branchesInput, BlockUncheckedCreateWithoutForked_branchesInput>
    where?: BlockWhereInput
  }

  export type BlockUpdateToOneWithWhereWithoutForked_branchesInput = {
    where?: BlockWhereInput
    data: XOR<BlockUpdateWithoutForked_branchesInput, BlockUncheckedUpdateWithoutForked_branchesInput>
  }

  export type BlockUpdateWithoutForked_branchesInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchesUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type BlockUncheckedUpdateWithoutForked_branchesInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    branch_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUpsertWithWhereUniqueWithoutBranchInput = {
    where: BlockWhereUniqueInput
    update: XOR<BlockUpdateWithoutBranchInput, BlockUncheckedUpdateWithoutBranchInput>
    create: XOR<BlockCreateWithoutBranchInput, BlockUncheckedCreateWithoutBranchInput>
  }

  export type BlockUpdateWithWhereUniqueWithoutBranchInput = {
    where: BlockWhereUniqueInput
    data: XOR<BlockUpdateWithoutBranchInput, BlockUncheckedUpdateWithoutBranchInput>
  }

  export type BlockUpdateManyWithWhereWithoutBranchInput = {
    where: BlockScalarWhereInput
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyWithoutBranchInput>
  }

  export type BlockScalarWhereInput = {
    AND?: BlockScalarWhereInput | BlockScalarWhereInput[]
    OR?: BlockScalarWhereInput[]
    NOT?: BlockScalarWhereInput | BlockScalarWhereInput[]
    block_id?: UuidFilter<"Block"> | string
    branch_id?: UuidFilter<"Block"> | string
    user_content?: StringFilter<"Block"> | string
    ai_content?: StringFilter<"Block"> | string
    created_at?: DateTimeFilter<"Block"> | Date | string
    update_at?: DateTimeFilter<"Block"> | Date | string
  }

  export type BranchesCreateWithoutBlocksInput = {
    branch_id?: string
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    chat: ChatlistCreateNestedOneWithoutBranchesInput
    parent_branch?: BranchesCreateNestedOneWithoutChild_branchesInput
    child_branches?: BranchesCreateNestedManyWithoutParent_branchInput
    parent_block?: BlockCreateNestedOneWithoutForked_branchesInput
  }

  export type BranchesUncheckedCreateWithoutBlocksInput = {
    branch_id?: string
    chat_id: string
    parent_branch_id?: string | null
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    child_branches?: BranchesUncheckedCreateNestedManyWithoutParent_branchInput
  }

  export type BranchesCreateOrConnectWithoutBlocksInput = {
    where: BranchesWhereUniqueInput
    create: XOR<BranchesCreateWithoutBlocksInput, BranchesUncheckedCreateWithoutBlocksInput>
  }

  export type BranchesCreateWithoutParent_blockInput = {
    branch_id?: string
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    chat: ChatlistCreateNestedOneWithoutBranchesInput
    parent_branch?: BranchesCreateNestedOneWithoutChild_branchesInput
    child_branches?: BranchesCreateNestedManyWithoutParent_branchInput
    blocks?: BlockCreateNestedManyWithoutBranchInput
  }

  export type BranchesUncheckedCreateWithoutParent_blockInput = {
    branch_id?: string
    chat_id: string
    parent_branch_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
    child_branches?: BranchesUncheckedCreateNestedManyWithoutParent_branchInput
    blocks?: BlockUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchesCreateOrConnectWithoutParent_blockInput = {
    where: BranchesWhereUniqueInput
    create: XOR<BranchesCreateWithoutParent_blockInput, BranchesUncheckedCreateWithoutParent_blockInput>
  }

  export type BranchesCreateManyParent_blockInputEnvelope = {
    data: BranchesCreateManyParent_blockInput | BranchesCreateManyParent_blockInput[]
    skipDuplicates?: boolean
  }

  export type BranchesUpsertWithoutBlocksInput = {
    update: XOR<BranchesUpdateWithoutBlocksInput, BranchesUncheckedUpdateWithoutBlocksInput>
    create: XOR<BranchesCreateWithoutBlocksInput, BranchesUncheckedCreateWithoutBlocksInput>
    where?: BranchesWhereInput
  }

  export type BranchesUpdateToOneWithWhereWithoutBlocksInput = {
    where?: BranchesWhereInput
    data: XOR<BranchesUpdateWithoutBlocksInput, BranchesUncheckedUpdateWithoutBlocksInput>
  }

  export type BranchesUpdateWithoutBlocksInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatlistUpdateOneRequiredWithoutBranchesNestedInput
    parent_branch?: BranchesUpdateOneWithoutChild_branchesNestedInput
    child_branches?: BranchesUpdateManyWithoutParent_branchNestedInput
    parent_block?: BlockUpdateOneWithoutForked_branchesNestedInput
  }

  export type BranchesUncheckedUpdateWithoutBlocksInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    child_branches?: BranchesUncheckedUpdateManyWithoutParent_branchNestedInput
  }

  export type BranchesUpsertWithWhereUniqueWithoutParent_blockInput = {
    where: BranchesWhereUniqueInput
    update: XOR<BranchesUpdateWithoutParent_blockInput, BranchesUncheckedUpdateWithoutParent_blockInput>
    create: XOR<BranchesCreateWithoutParent_blockInput, BranchesUncheckedCreateWithoutParent_blockInput>
  }

  export type BranchesUpdateWithWhereUniqueWithoutParent_blockInput = {
    where: BranchesWhereUniqueInput
    data: XOR<BranchesUpdateWithoutParent_blockInput, BranchesUncheckedUpdateWithoutParent_blockInput>
  }

  export type BranchesUpdateManyWithWhereWithoutParent_blockInput = {
    where: BranchesScalarWhereInput
    data: XOR<BranchesUpdateManyMutationInput, BranchesUncheckedUpdateManyWithoutParent_blockInput>
  }

  export type ChatlistCreateManyUserInput = {
    chat_id?: string
    is_pinned: boolean
    chat_title: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type ChatlistUpdateWithoutUserInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: BranchesUpdateManyWithoutChatNestedInput
  }

  export type ChatlistUncheckedUpdateWithoutUserInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: BranchesUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatlistUncheckedUpdateManyWithoutUserInput = {
    chat_id?: StringFieldUpdateOperationsInput | string
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    chat_title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesCreateManyChatInput = {
    branch_id?: string
    parent_branch_id?: string | null
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BranchesUpdateWithoutChatInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent_branch?: BranchesUpdateOneWithoutChild_branchesNestedInput
    child_branches?: BranchesUpdateManyWithoutParent_branchNestedInput
    parent_block?: BlockUpdateOneWithoutForked_branchesNestedInput
    blocks?: BlockUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateWithoutChatInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    child_branches?: BranchesUncheckedUpdateManyWithoutParent_branchNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateManyWithoutChatInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesCreateManyParent_branchInput = {
    branch_id?: string
    chat_id: string
    parent_block_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BlockCreateManyBranchInput = {
    block_id?: string
    user_content: string
    ai_content: string
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BranchesUpdateWithoutParent_branchInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatlistUpdateOneRequiredWithoutBranchesNestedInput
    child_branches?: BranchesUpdateManyWithoutParent_branchNestedInput
    parent_block?: BlockUpdateOneWithoutForked_branchesNestedInput
    blocks?: BlockUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateWithoutParent_branchInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    child_branches?: BranchesUncheckedUpdateManyWithoutParent_branchNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateManyWithoutParent_branchInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_block_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUpdateWithoutBranchInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    forked_branches?: BranchesUpdateManyWithoutParent_blockNestedInput
  }

  export type BlockUncheckedUpdateWithoutBranchInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    forked_branches?: BranchesUncheckedUpdateManyWithoutParent_blockNestedInput
  }

  export type BlockUncheckedUpdateManyWithoutBranchInput = {
    block_id?: StringFieldUpdateOperationsInput | string
    user_content?: StringFieldUpdateOperationsInput | string
    ai_content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchesCreateManyParent_blockInput = {
    branch_id?: string
    chat_id: string
    parent_branch_id?: string | null
    branch_title: string
    status: string
    depth?: number
    created_at?: Date | string
    update_at?: Date | string
  }

  export type BranchesUpdateWithoutParent_blockInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatlistUpdateOneRequiredWithoutBranchesNestedInput
    parent_branch?: BranchesUpdateOneWithoutChild_branchesNestedInput
    child_branches?: BranchesUpdateManyWithoutParent_branchNestedInput
    blocks?: BlockUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateWithoutParent_blockInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    child_branches?: BranchesUncheckedUpdateManyWithoutParent_branchNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchesUncheckedUpdateManyWithoutParent_blockInput = {
    branch_id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    parent_branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    branch_title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}