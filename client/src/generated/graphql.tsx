import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<UserClass>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  walletAddress?: Maybe<Scalars['String']>;
};

export type UserClass = {
  __typename?: 'UserClass';
  _id: Scalars['ID'];
  username: Scalars['String'];
  walletAddress: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  nonce: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newUser: UserClass;
  login: Scalars['String'];
};


export type MutationNewUserArgs = {
  data: NewUserData;
};


export type MutationLoginArgs = {
  data: LoginData;
};

/** New user data */
export type NewUserData = {
  username: Scalars['String'];
  walletAddress: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
};

/** Login data */
export type LoginData = {
  walletAddress: Scalars['String'];
  signature: Scalars['String'];
};

export type UserSnippetFragment = (
  { __typename?: 'UserClass' }
  & Pick<UserClass, '_id' | 'username' | 'walletAddress' | 'bio'>
);

export type LoginMutationVariables = Exact<{
  data: LoginData;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type NewUserMutationVariables = Exact<{
  data: NewUserData;
}>;


export type NewUserMutation = (
  { __typename?: 'Mutation' }
  & { newUser: (
    { __typename?: 'UserClass' }
    & Pick<UserClass, 'username' | 'walletAddress' | 'bio'>
  ) }
);

export type UserQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  walletAddress?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserClass' }
    & UserSnippetFragment
  )> }
);

export const UserSnippetFragmentDoc = gql`
    fragment UserSnippet on UserClass {
  _id
  username
  walletAddress
  bio
}
    `;
export const LoginDocument = gql`
    mutation Login($data: LoginData!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const NewUserDocument = gql`
    mutation NewUser($data: NewUserData!) {
  newUser(data: $data) {
    username
    walletAddress
    bio
  }
}
    `;
export type NewUserMutationFn = Apollo.MutationFunction<NewUserMutation, NewUserMutationVariables>;

/**
 * __useNewUserMutation__
 *
 * To run a mutation, you first call `useNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newUserMutation, { data, loading, error }] = useNewUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewUserMutation(baseOptions?: Apollo.MutationHookOptions<NewUserMutation, NewUserMutationVariables>) {
        return Apollo.useMutation<NewUserMutation, NewUserMutationVariables>(NewUserDocument, baseOptions);
      }
export type NewUserMutationHookResult = ReturnType<typeof useNewUserMutation>;
export type NewUserMutationResult = Apollo.MutationResult<NewUserMutation>;
export type NewUserMutationOptions = Apollo.BaseMutationOptions<NewUserMutation, NewUserMutationVariables>;
export const UserDocument = gql`
    query User($id: ID, $username: String, $walletAddress: String) {
  user(id: $id, username: $username, walletAddress: $walletAddress) {
    ...UserSnippet
  }
}
    ${UserSnippetFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *      walletAddress: // value for 'walletAddress'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;