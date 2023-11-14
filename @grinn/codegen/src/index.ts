// @ts-nocheck
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

/** All input for the `acceptInvitationToOrganization` mutation. */
export type AcceptInvitationToOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};

/** The output of our `acceptInvitationToOrganization` mutation. */
export type AcceptInvitationToOrganizationPayload = {
  __typename?: 'AcceptInvitationToOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `changePassword` mutation. */
export type ChangePasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

/** The output of our `changePassword` mutation. */
export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `confirmAccountDeletion` mutation. */
export type ConfirmAccountDeletionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

/** The output of our `confirmAccountDeletion` mutation. */
export type ConfirmAccountDeletionPayload = {
  __typename?: 'ConfirmAccountDeletionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `createOrganization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** The output of our `createOrganization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createOrganization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the create `UserEmail` mutation. */
export type CreateUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `UserEmail` to be created by this mutation. */
  userEmail: UserEmailInput;
};

/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayload = {
  __typename?: 'CreateUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was created by this mutation. */
  userEmail?: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge?: Maybe<UserEmailsEdge>;
};


/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayloadUserEmailEdgeArgs = {
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
};

/** The output of our `deleteOrganization` mutation. */
export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteUserAuthentication` mutation. */
export type DeleteUserAuthenticationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserAuthentication` mutation. */
export type DeleteUserAuthenticationPayload = {
  __typename?: 'DeleteUserAuthenticationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserAuthenticationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  /** The `UserAuthentication` that was deleted by this mutation. */
  userAuthentication?: Maybe<UserAuthentication>;
};

/** All input for the `deleteUserEmail` mutation. */
export type DeleteUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayload = {
  __typename?: 'DeleteUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserEmailNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was deleted by this mutation. */
  userEmail?: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge?: Maybe<UserEmailsEdge>;
};


/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayloadUserEmailEdgeArgs = {
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** All input for the `forgotPassword` mutation. */
export type ForgotPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

/** The output of our `forgotPassword` mutation. */
export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `inviteToOrganization` mutation. */
export type InviteToOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  username?: InputMaybe<Scalars['String']>;
};

/** The output of our `inviteToOrganization` mutation. */
export type InviteToOrganizationPayload = {
  __typename?: 'InviteToOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  user: User;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  emailId: Scalars['UUID'];
};

/** The output of our `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryPayload = {
  __typename?: 'MakeEmailPrimaryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  userEmail?: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge?: Maybe<UserEmailsEdge>;
};


/** The output of our `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryPayloadUserEmailEdgeArgs = {
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** If someone invited you by your email address then you must include the code that was emailed to you, otherwise you may accept the invitation directly using the UUID. If successful, you will be a member of the organization. */
  acceptInvitationToOrganization?: Maybe<AcceptInvitationToOrganizationPayload>;
  /** Enter your old password and a new password to change your password. */
  changePassword?: Maybe<ChangePasswordPayload>;
  /** If you're certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion. */
  confirmAccountDeletion?: Maybe<ConfirmAccountDeletionPayload>;
  /** An `Organization` is a great way of sharing access to resources between multiple users without compromising security. When you create an organization you will have the 'owner' and 'billing contact' roles. You may invite other users and redistribute these roles. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `UserEmail`. */
  createUserEmail?: Maybe<CreateUserEmailPayload>;
  /** Only the 'owner' may delete an organization. This operation cannot be undone, so be sure that it is what you intend. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `UserAuthentication` using a unique key. */
  deleteUserAuthentication?: Maybe<DeleteUserAuthenticationPayload>;
  /** Deletes a single `UserEmail` using a unique key. */
  deleteUserEmail?: Maybe<DeleteUserEmailPayload>;
  /** If you've forgotten your password, give us one of your email addresses and we'll send you a reset token. Note this only works if you have added an email address! */
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  /** You may invite a user to your organization either by their username (only for verified users) or by their email. If you opt to invite by email then an email will be sent to this person containing a code that they need to accept the invitation. If the person doesn't already have an account they will be instructed to create one; their account need not have the email address that you invited listed as the secret code is confirmation enough. */
  inviteToOrganization?: Maybe<InviteToOrganizationPayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login?: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout?: Maybe<LogoutPayload>;
  /** Your primary email is where we'll notify of account events; other emails may be used for discovery or login. Use this when you're changing your email address. */
  makeEmailPrimary?: Maybe<MakeEmailPrimaryPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register?: Maybe<RegisterPayload>;
  /** The owner of an `Organization` may remove an `OrganizationMember` with this mutation. */
  removeFromOrganization?: Maybe<RemoveFromOrganizationPayload>;
  /** Begin the account deletion flow by requesting the confirmation email */
  requestAccountDeletion?: Maybe<RequestAccountDeletionPayload>;
  /** If you didn't receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently. */
  resendEmailVerificationCode?: Maybe<ResendEmailVerificationCodePayload>;
  /** After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** The owner of an `Organization` may use this mutation to make any organization member the billing contact. */
  transferOrganizationBillingContact?: Maybe<TransferOrganizationBillingContactPayload>;
  /** The owner of an `Organization` may use this mutation to transfer ownership to a different organization member. Take care, if you assign ownership to someone who cannot or will not access their account then you may need to contact support to have ownership reassigned. */
  transferOrganizationOwnership?: Maybe<TransferOrganizationOwnershipPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Once you have received a verification token for your email, you may call this mutation with that token to make your email verified. */
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAcceptInvitationToOrganizationArgs = {
  input: AcceptInvitationToOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationConfirmAccountDeletionArgs = {
  input: ConfirmAccountDeletionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserEmailArgs = {
  input: CreateUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserAuthenticationArgs = {
  input: DeleteUserAuthenticationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserEmailArgs = {
  input: DeleteUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationInviteToOrganizationArgs = {
  input: InviteToOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMakeEmailPrimaryArgs = {
  input: MakeEmailPrimaryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRemoveFromOrganizationArgs = {
  input: RemoveFromOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRequestAccountDeletionArgs = {
  input: RequestAccountDeletionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResendEmailVerificationCodeArgs = {
  input: ResendEmailVerificationCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationTransferOrganizationBillingContactArgs = {
  input: TransferOrganizationBillingContactInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationTransferOrganizationOwnershipArgs = {
  input: TransferOrganizationOwnershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['Datetime'];
  currentUserIsBillingContact?: Maybe<Scalars['Boolean']>;
  currentUserIsOwner?: Maybe<Scalars['Boolean']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  slug: Scalars['String'];
};


export type OrganizationOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
};

export type OrganizationMembership = {
  __typename?: 'OrganizationMembership';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  isBillingContact: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `OrganizationMembership` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type OrganizationMembershipCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `OrganizationMembership` values. */
export type OrganizationMembershipsConnection = {
  __typename?: 'OrganizationMembershipsConnection';
  /** A list of edges which contains the `OrganizationMembership` and cursor to aid in pagination. */
  edges: Array<OrganizationMembershipsEdge>;
  /** A list of `OrganizationMembership` objects. */
  nodes: Array<OrganizationMembership>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OrganizationMembership` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OrganizationMembership` edge in the connection. */
export type OrganizationMembershipsEdge = {
  __typename?: 'OrganizationMembershipsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OrganizationMembership` at the end of the edge. */
  node: OrganizationMembership;
};

/** Methods to use when ordering `OrganizationMembership`. */
export enum OrganizationMembershipsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MemberNameAsc = 'MEMBER_NAME_ASC',
  MemberNameDesc = 'MEMBER_NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationsConnection = {
  __typename?: 'OrganizationsConnection';
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<OrganizationsEdge>;
  /** A list of `Organization` objects. */
  nodes: Array<Organization>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Organization` edge in the connection. */
export type OrganizationsEdge = {
  __typename?: 'OrganizationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Organization` at the end of the edge. */
  node: Organization;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /** The currently logged in user (or null if not logged in). */
  currentUser?: Maybe<User>;
  organization?: Maybe<Organization>;
  organizationBySlug?: Maybe<Organization>;
  /** Given an invitation UUID (and, if required, the code that was emailed to you), retrieves the `Organization` that you were invited to. */
  organizationForInvitation?: Maybe<Organization>;
  organizationMembership?: Maybe<OrganizationMembership>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationsConnection>;
  user?: Maybe<User>;
  userAuthentication?: Maybe<UserAuthentication>;
  userByUsername?: Maybe<User>;
  userEmail?: Maybe<UserEmail>;
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationForInvitationArgs = {
  code?: InputMaybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserAuthenticationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserEmailArgs = {
  id: Scalars['UUID'];
};

export type RegisterInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  user: User;
};

/** All input for the `removeFromOrganization` mutation. */
export type RemoveFromOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `removeFromOrganization` mutation. */
export type RemoveFromOrganizationPayload = {
  __typename?: 'RemoveFromOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `requestAccountDeletion` mutation. */
export type RequestAccountDeletionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our `requestAccountDeletion` mutation. */
export type RequestAccountDeletionPayload = {
  __typename?: 'RequestAccountDeletionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `resendEmailVerificationCode` mutation. */
export type ResendEmailVerificationCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  emailId: Scalars['UUID'];
};

/** The output of our `resendEmailVerificationCode` mutation. */
export type ResendEmailVerificationCodePayload = {
  __typename?: 'ResendEmailVerificationCodePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
  userId: Scalars['UUID'];
};

/** The output of our `resetPassword` mutation. */
export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered when the logged in user's record is updated in some way. */
  currentUserUpdated?: Maybe<UserSubscriptionPayload>;
};

/** All input for the `transferOrganizationBillingContact` mutation. */
export type TransferOrganizationBillingContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `transferOrganizationBillingContact` mutation. */
export type TransferOrganizationBillingContactPayload = {
  __typename?: 'TransferOrganizationBillingContactPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `transferOrganizationBillingContact` mutation. */
export type TransferOrganizationBillingContactPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipPayload = {
  __typename?: 'TransferOrganizationOwnershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was updated by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** A user who can log in to the application. */
export type User = {
  __typename?: 'User';
  /** Optional avatar URL. */
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** If true, the user has elevated privileges. */
  isAdmin: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  /** Public-facing name (or pseudonym) of the user. */
  name?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserAuthentication`. */
  userAuthenticationsList: Array<UserAuthentication>;
  /** Reads and enables pagination through a set of `UserEmail`. */
  userEmails: UserEmailsConnection;
  /** Public-facing username (or 'handle') of the user. */
  username: Scalars['String'];
};


/** A user who can log in to the application. */
export type UserOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserAuthenticationsListArgs = {
  condition?: InputMaybe<UserAuthenticationCondition>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserAuthenticationsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserEmailsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserEmailCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** Contains information about the login providers this user has used, so that they may disconnect them should they wish. */
export type UserAuthentication = {
  __typename?: 'UserAuthentication';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A unique identifier for the user within the login service. */
  identifier: Scalars['String'];
  /** The login service used, e.g. `twitter` or `github`. */
  service: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserAuthentication` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserAuthenticationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `service` field. */
  service?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** Methods to use when ordering `UserAuthentication`. */
export enum UserAuthenticationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ServiceAsc = 'SERVICE_ASC',
  ServiceDesc = 'SERVICE_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Information about a user's email address. */
export type UserEmail = {
  __typename?: 'UserEmail';
  createdAt: Scalars['Datetime'];
  /** The users email address, in `a@b.c` format. */
  email: Scalars['String'];
  id: Scalars['UUID'];
  isPrimary: Scalars['Boolean'];
  /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
  isVerified: Scalars['Boolean'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserEmail` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserEmailCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isPrimary` field. */
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** An input for mutations affecting `UserEmail` */
export type UserEmailInput = {
  /** The users email address, in `a@b.c` format. */
  email: Scalars['String'];
};

/** A connection to a list of `UserEmail` values. */
export type UserEmailsConnection = {
  __typename?: 'UserEmailsConnection';
  /** A list of edges which contains the `UserEmail` and cursor to aid in pagination. */
  edges: Array<UserEmailsEdge>;
  /** A list of `UserEmail` objects. */
  nodes: Array<UserEmail>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserEmail` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserEmail` edge in the connection. */
export type UserEmailsEdge = {
  __typename?: 'UserEmailsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserEmail` at the end of the edge. */
  node: UserEmail;
};

/** Methods to use when ordering `UserEmail`. */
export enum UserEmailsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPrimaryAsc = 'IS_PRIMARY_ASC',
  IsPrimaryDesc = 'IS_PRIMARY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  /** Optional avatar URL. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** Public-facing name (or pseudonym) of the user. */
  name?: InputMaybe<Scalars['String']>;
  /** Public-facing username (or 'handle') of the user. */
  username?: InputMaybe<Scalars['String']>;
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  event?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/** All input for the `verifyEmail` mutation. */
export type VerifyEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  userEmailId: Scalars['UUID'];
};

/** The output of our `verifyEmail` mutation. */
export type VerifyEmailPayload = {
  __typename?: 'VerifyEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AcceptOrganizationInviteMutationVariables = Exact<{
  id: Scalars['UUID'];
  code?: InputMaybe<Scalars['String']>;
}>;


export type AcceptOrganizationInviteMutation = { __typename?: 'Mutation', acceptInvitationToOrganization?: { __typename?: 'AcceptInvitationToOrganizationPayload', clientMutationId?: string | null } | null };

export type AddEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddEmailMutation = { __typename?: 'Mutation', createUserEmail?: { __typename?: 'CreateUserEmailPayload', user?: { __typename?: 'User', id: any, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string, isVerified: boolean, isPrimary: boolean, createdAt: any }> } } | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'ChangePasswordPayload', success?: boolean | null } | null };

export type ConfirmAccountDeletionMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmAccountDeletionMutation = { __typename?: 'Mutation', confirmAccountDeletion?: { __typename?: 'ConfirmAccountDeletionPayload', success?: boolean | null } | null };

export type CreatedOrganizationFragment = { __typename?: 'Organization', id: any, name: string, slug: string };

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null, query?: { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug: string } | null } | null } | null };

export type CurrentUserAuthenticationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserAuthenticationsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, authentications: Array<{ __typename?: 'UserAuthentication', id: any, service: string, identifier: string, createdAt: any }> } | null };

export type CurrentUserUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserUpdatedSubscription = { __typename?: 'Subscription', currentUserUpdated?: { __typename?: 'UserSubscriptionPayload', event?: string | null, user?: { __typename?: 'User', id: any, username: string, name?: string | null, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean } | null } | null };

export type DeleteEmailMutationVariables = Exact<{
  emailId: Scalars['UUID'];
}>;


export type DeleteEmailMutation = { __typename?: 'Mutation', deleteUserEmail?: { __typename?: 'DeleteUserEmailPayload', user?: { __typename?: 'User', id: any, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string, isVerified: boolean, isPrimary: boolean, createdAt: any }> } } | null } | null };

export type DeleteOrganizationMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization?: { __typename?: 'DeleteOrganizationPayload', clientMutationId?: string | null } | null };

export type EmailsForm_UserFragment = { __typename?: 'User', id: any, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string, isVerified: boolean, isPrimary: boolean, createdAt: any }> } };

export type EmailsForm_UserEmailFragment = { __typename?: 'UserEmail', id: any, email: string, isVerified: boolean, isPrimary: boolean, createdAt: any };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'ForgotPasswordPayload', clientMutationId?: string | null } | null };

export type InvitationDetailQueryVariables = Exact<{
  id: Scalars['UUID'];
  code?: InputMaybe<Scalars['String']>;
}>;


export type InvitationDetailQuery = { __typename?: 'Query', organizationForInvitation?: { __typename?: 'Organization', id: any, name: string, slug: string } | null, currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type InviteToOrganizationMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type InviteToOrganizationMutation = { __typename?: 'Mutation', inviteToOrganization?: { __typename?: 'InviteToOrganizationPayload', clientMutationId?: string | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginPayload', user: { __typename?: 'User', id: any, username: string, name?: string | null } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutPayload', success?: boolean | null } | null };

export type MakeEmailPrimaryMutationVariables = Exact<{
  emailId: Scalars['UUID'];
}>;


export type MakeEmailPrimaryMutation = { __typename?: 'Mutation', makeEmailPrimary?: { __typename?: 'MakeEmailPrimaryPayload', user?: { __typename?: 'User', id: any, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, isPrimary: boolean }> } } | null } | null };

export type OrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type OrganizationBySlugQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug: string } | null };

export type OrganizationMembers_MembershipFragment = { __typename?: 'OrganizationMembership', id: any, createdAt: any, isOwner: boolean, isBillingContact: boolean, user?: { __typename?: 'User', id: any, username: string, name?: string | null } | null };

export type OrganizationMembers_OrganizationFragment = { __typename?: 'Organization', id: any, name: string, slug: string, currentUserIsOwner?: boolean | null, currentUserIsBillingContact?: boolean | null, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', totalCount: number, nodes: Array<{ __typename?: 'OrganizationMembership', id: any, createdAt: any, isOwner: boolean, isBillingContact: boolean, user?: { __typename?: 'User', id: any, username: string, name?: string | null } | null }> } };

export type OrganizationMembersQueryVariables = Exact<{
  slug: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type OrganizationMembersQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug: string, currentUserIsOwner?: boolean | null, currentUserIsBillingContact?: boolean | null, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', totalCount: number, nodes: Array<{ __typename?: 'OrganizationMembership', id: any, createdAt: any, isOwner: boolean, isBillingContact: boolean, user?: { __typename?: 'User', id: any, username: string, name?: string | null } | null }> } } | null, currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type OrganizationPageQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type OrganizationPageQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug: string, currentUserIsOwner?: boolean | null, currentUserIsBillingContact?: boolean | null } | null, currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type OrganizationPage_OrganizationFragment = { __typename?: 'Organization', id: any, name: string, slug: string, currentUserIsOwner?: boolean | null, currentUserIsBillingContact?: boolean | null };

export type OrganizationPage_QueryFragment = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug: string, currentUserIsOwner?: boolean | null, currentUserIsBillingContact?: boolean | null } | null, currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type ProfileSettingsForm_UserFragment = { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterPayload', user: { __typename?: 'User', id: any, username: string, name?: string | null } } | null };

export type RemoveFromOrganizationMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
}>;


export type RemoveFromOrganizationMutation = { __typename?: 'Mutation', removeFromOrganization?: { __typename?: 'RemoveFromOrganizationPayload', clientMutationId?: string | null } | null };

export type RequestAccountDeletionMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestAccountDeletionMutation = { __typename?: 'Mutation', requestAccountDeletion?: { __typename?: 'RequestAccountDeletionPayload', success?: boolean | null } | null };

export type ResendEmailVerificationMutationVariables = Exact<{
  emailId: Scalars['UUID'];
}>;


export type ResendEmailVerificationMutation = { __typename?: 'Mutation', resendEmailVerificationCode?: { __typename?: 'ResendEmailVerificationCodePayload', success?: boolean | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['UUID'];
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'ResetPasswordPayload', success?: boolean | null } | null };

export type SettingsEmailsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsEmailsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, isVerified: boolean, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string, isVerified: boolean, isPrimary: boolean, createdAt: any }> }, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type SettingsPasswordQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsPasswordQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, hasPassword?: boolean | null, userEmails: { __typename?: 'UserEmailsConnection', nodes: Array<{ __typename?: 'UserEmail', id: any, email: string }> } } | null };

export type SettingsProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsProfileQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type SharedQueryVariables = Exact<{ [key: string]: never; }>;


export type SharedQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type SharedLayout_QueryFragment = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } } | null };

export type SharedLayout_UserFragment = { __typename?: 'User', id: any, name?: string | null, username: string, avatarUrl?: string | null, isAdmin: boolean, isVerified: boolean, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, isOwner: boolean, isBillingContact: boolean, organization?: { __typename?: 'Organization', id: any, name: string, slug: string } | null }> } };

export type TransferOrganizationBillingContactMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
}>;


export type TransferOrganizationBillingContactMutation = { __typename?: 'Mutation', transferOrganizationBillingContact?: { __typename?: 'TransferOrganizationBillingContactPayload', organization?: { __typename?: 'Organization', id: any, currentUserIsBillingContact?: boolean | null } | null } | null };

export type TransferOrganizationOwnershipMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
}>;


export type TransferOrganizationOwnershipMutation = { __typename?: 'Mutation', transferOrganizationOwnership?: { __typename?: 'TransferOrganizationOwnershipPayload', organization?: { __typename?: 'Organization', id: any, currentUserIsOwner?: boolean | null } | null } | null };

export type UnlinkUserAuthenticationMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type UnlinkUserAuthenticationMutation = { __typename?: 'Mutation', deleteUserAuthentication?: { __typename?: 'DeleteUserAuthenticationPayload', user?: { __typename?: 'User', id: any, userAuthenticationsList: Array<{ __typename?: 'UserAuthentication', id: any, identifier: string, service: string, createdAt: any }> } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', id: any, slug: string, name: string } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['UUID'];
  patch: UserPatch;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UpdateUserPayload', clientMutationId?: string | null, user?: { __typename?: 'User', id: any, name?: string | null, username: string } | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  id: Scalars['UUID'];
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail?: { __typename?: 'VerifyEmailPayload', success?: boolean | null, query?: { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, isVerified: boolean } | null } | null } | null };

export const CreatedOrganizationFragmentDoc = gql`
    fragment CreatedOrganization on Organization {
  id
  name
  slug
}
    `;
export const EmailsForm_UserEmailFragmentDoc = gql`
    fragment EmailsForm_UserEmail on UserEmail {
  id
  email
  isVerified
  isPrimary
  createdAt
}
    `;
export const EmailsForm_UserFragmentDoc = gql`
    fragment EmailsForm_User on User {
  id
  userEmails(first: 50) {
    nodes {
      ...EmailsForm_UserEmail
      id
      email
      isVerified
    }
  }
}
    ${EmailsForm_UserEmailFragmentDoc}`;
export const OrganizationPage_OrganizationFragmentDoc = gql`
    fragment OrganizationPage_Organization on Organization {
  id
  name
  slug
  currentUserIsOwner
  currentUserIsBillingContact
}
    `;
export const OrganizationMembers_MembershipFragmentDoc = gql`
    fragment OrganizationMembers_Membership on OrganizationMembership {
  id
  createdAt
  isOwner
  isBillingContact
  user {
    id
    username
    name
  }
}
    `;
export const OrganizationMembers_OrganizationFragmentDoc = gql`
    fragment OrganizationMembers_Organization on Organization {
  id
  ...OrganizationPage_Organization
  name
  slug
  organizationMemberships(first: 10, offset: $offset, orderBy: [MEMBER_NAME_ASC]) {
    nodes {
      id
      ...OrganizationMembers_Membership
    }
    totalCount
  }
}
    ${OrganizationPage_OrganizationFragmentDoc}
${OrganizationMembers_MembershipFragmentDoc}`;
export const SharedLayout_UserFragmentDoc = gql`
    fragment SharedLayout_User on User {
  id
  name
  username
  avatarUrl
  isAdmin
  isVerified
  organizationMemberships(first: 20) {
    nodes {
      id
      isOwner
      isBillingContact
      organization {
        id
        name
        slug
      }
    }
  }
}
    `;
export const SharedLayout_QueryFragmentDoc = gql`
    fragment SharedLayout_Query on Query {
  currentUser {
    id
    ...SharedLayout_User
  }
}
    ${SharedLayout_UserFragmentDoc}`;
export const OrganizationPage_QueryFragmentDoc = gql`
    fragment OrganizationPage_Query on Query {
  ...SharedLayout_Query
  organizationBySlug(slug: $slug) {
    id
    ...OrganizationPage_Organization
  }
}
    ${SharedLayout_QueryFragmentDoc}
${OrganizationPage_OrganizationFragmentDoc}`;
export const ProfileSettingsForm_UserFragmentDoc = gql`
    fragment ProfileSettingsForm_User on User {
  id
  name
  username
  avatarUrl
}
    `;
export const AcceptOrganizationInviteDocument = gql`
    mutation AcceptOrganizationInvite($id: UUID!, $code: String) {
  acceptInvitationToOrganization(input: {invitationId: $id, code: $code}) {
    clientMutationId
  }
}
    `;
export const AddEmailDocument = gql`
    mutation AddEmail($email: String!) {
  createUserEmail(input: {userEmail: {email: $email}}) {
    user {
      id
      userEmails(first: 50) {
        nodes {
          id
          ...EmailsForm_UserEmail
        }
      }
    }
  }
}
    ${EmailsForm_UserEmailFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(input: {oldPassword: $oldPassword, newPassword: $newPassword}) {
    success
  }
}
    `;
export const ConfirmAccountDeletionDocument = gql`
    mutation ConfirmAccountDeletion($token: String!) {
  confirmAccountDeletion(input: {token: $token}) {
    success
  }
}
    `;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($name: String!, $slug: String!) {
  createOrganization(input: {name: $name, slug: $slug}) {
    organization {
      id
      ...CreatedOrganization
    }
    query {
      organizationBySlug(slug: $slug) {
        id
        ...CreatedOrganization
      }
    }
  }
}
    ${CreatedOrganizationFragmentDoc}`;
export const CurrentUserAuthenticationsDocument = gql`
    query CurrentUserAuthentications {
  currentUser {
    id
    authentications: userAuthenticationsList(first: 50) {
      id
      service
      identifier
      createdAt
    }
  }
}
    `;
export const CurrentUserUpdatedDocument = gql`
    subscription CurrentUserUpdated {
  currentUserUpdated {
    event
    user {
      id
      username
      name
      avatarUrl
      isAdmin
      isVerified
    }
  }
}
    `;
export const DeleteEmailDocument = gql`
    mutation DeleteEmail($emailId: UUID!) {
  deleteUserEmail(input: {id: $emailId}) {
    user {
      id
      userEmails(first: 50) {
        nodes {
          id
          ...EmailsForm_UserEmail
        }
      }
    }
  }
}
    ${EmailsForm_UserEmailFragmentDoc}`;
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization($organizationId: UUID!) {
  deleteOrganization(input: {organizationId: $organizationId}) {
    clientMutationId
  }
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(input: {email: $email}) {
    clientMutationId
  }
}
    `;
export const InvitationDetailDocument = gql`
    query InvitationDetail($id: UUID!, $code: String) {
  ...SharedLayout_Query
  organizationForInvitation(invitationId: $id, code: $code) {
    id
    name
    slug
  }
}
    ${SharedLayout_QueryFragmentDoc}`;
export const InviteToOrganizationDocument = gql`
    mutation InviteToOrganization($organizationId: UUID!, $email: String, $username: String) {
  inviteToOrganization(
    input: {organizationId: $organizationId, email: $email, username: $username}
  ) {
    clientMutationId
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    user {
      id
      username
      name
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export const MakeEmailPrimaryDocument = gql`
    mutation MakeEmailPrimary($emailId: UUID!) {
  makeEmailPrimary(input: {emailId: $emailId}) {
    user {
      id
      userEmails(first: 50) {
        nodes {
          id
          isPrimary
        }
      }
    }
  }
}
    `;
export const OrganizationBySlugDocument = gql`
    query OrganizationBySlug($slug: String!) {
  organizationBySlug(slug: $slug) {
    id
    name
    slug
  }
}
    `;
export const OrganizationMembersDocument = gql`
    query OrganizationMembers($slug: String!, $offset: Int = 0) {
  ...OrganizationPage_Query
  organizationBySlug(slug: $slug) {
    id
    ...OrganizationMembers_Organization
  }
}
    ${OrganizationPage_QueryFragmentDoc}
${OrganizationMembers_OrganizationFragmentDoc}`;
export const OrganizationPageDocument = gql`
    query OrganizationPage($slug: String!) {
  ...OrganizationPage_Query
}
    ${OrganizationPage_QueryFragmentDoc}`;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!, $name: String) {
  register(
    input: {username: $username, password: $password, email: $email, name: $name}
  ) {
    user {
      id
      username
      name
    }
  }
}
    `;
export const RemoveFromOrganizationDocument = gql`
    mutation RemoveFromOrganization($organizationId: UUID!, $userId: UUID!) {
  removeFromOrganization(
    input: {organizationId: $organizationId, userId: $userId}
  ) {
    clientMutationId
  }
}
    `;
export const RequestAccountDeletionDocument = gql`
    mutation RequestAccountDeletion {
  requestAccountDeletion(input: {}) {
    success
  }
}
    `;
export const ResendEmailVerificationDocument = gql`
    mutation ResendEmailVerification($emailId: UUID!) {
  resendEmailVerificationCode(input: {emailId: $emailId}) {
    success
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userId: UUID!, $token: String!, $password: String!) {
  resetPassword(
    input: {userId: $userId, resetToken: $token, newPassword: $password}
  ) {
    success
  }
}
    `;
export const SettingsEmailsDocument = gql`
    query SettingsEmails {
  ...SharedLayout_Query
  currentUser {
    id
    isVerified
    ...EmailsForm_User
  }
}
    ${SharedLayout_QueryFragmentDoc}
${EmailsForm_UserFragmentDoc}`;
export const SettingsPasswordDocument = gql`
    query SettingsPassword {
  currentUser {
    id
    hasPassword
    userEmails(first: 1, condition: {isPrimary: true}) {
      nodes {
        id
        email
      }
    }
  }
}
    `;
export const SettingsProfileDocument = gql`
    query SettingsProfile {
  ...SharedLayout_Query
  currentUser {
    id
    ...ProfileSettingsForm_User
  }
}
    ${SharedLayout_QueryFragmentDoc}
${ProfileSettingsForm_UserFragmentDoc}`;
export const SharedDocument = gql`
    query Shared {
  ...SharedLayout_Query
}
    ${SharedLayout_QueryFragmentDoc}`;
export const TransferOrganizationBillingContactDocument = gql`
    mutation TransferOrganizationBillingContact($organizationId: UUID!, $userId: UUID!) {
  transferOrganizationBillingContact(
    input: {organizationId: $organizationId, userId: $userId}
  ) {
    organization {
      id
      currentUserIsBillingContact
    }
  }
}
    `;
export const TransferOrganizationOwnershipDocument = gql`
    mutation TransferOrganizationOwnership($organizationId: UUID!, $userId: UUID!) {
  transferOrganizationOwnership(
    input: {organizationId: $organizationId, userId: $userId}
  ) {
    organization {
      id
      currentUserIsOwner
    }
  }
}
    `;
export const UnlinkUserAuthenticationDocument = gql`
    mutation UnlinkUserAuthentication($id: UUID!) {
  deleteUserAuthentication(input: {id: $id}) {
    user {
      id
      userAuthenticationsList(first: 50) {
        id
        identifier
        service
        createdAt
      }
    }
  }
}
    `;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    organization {
      id
      slug
      name
    }
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: UUID!, $patch: UserPatch!) {
  updateUser(input: {id: $id, patch: $patch}) {
    clientMutationId
    user {
      id
      name
      username
    }
  }
}
    `;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($id: UUID!, $token: String!) {
  verifyEmail(input: {userEmailId: $id, token: $token}) {
    success
    query {
      currentUser {
        id
        isVerified
      }
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    AcceptOrganizationInvite(variables: AcceptOrganizationInviteMutationVariables, options?: C): Promise<AcceptOrganizationInviteMutation> {
      return requester<AcceptOrganizationInviteMutation, AcceptOrganizationInviteMutationVariables>(AcceptOrganizationInviteDocument, variables, options) as Promise<AcceptOrganizationInviteMutation>;
    },
    AddEmail(variables: AddEmailMutationVariables, options?: C): Promise<AddEmailMutation> {
      return requester<AddEmailMutation, AddEmailMutationVariables>(AddEmailDocument, variables, options) as Promise<AddEmailMutation>;
    },
    ChangePassword(variables: ChangePasswordMutationVariables, options?: C): Promise<ChangePasswordMutation> {
      return requester<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, variables, options) as Promise<ChangePasswordMutation>;
    },
    ConfirmAccountDeletion(variables: ConfirmAccountDeletionMutationVariables, options?: C): Promise<ConfirmAccountDeletionMutation> {
      return requester<ConfirmAccountDeletionMutation, ConfirmAccountDeletionMutationVariables>(ConfirmAccountDeletionDocument, variables, options) as Promise<ConfirmAccountDeletionMutation>;
    },
    CreateOrganization(variables: CreateOrganizationMutationVariables, options?: C): Promise<CreateOrganizationMutation> {
      return requester<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, variables, options) as Promise<CreateOrganizationMutation>;
    },
    CurrentUserAuthentications(variables?: CurrentUserAuthenticationsQueryVariables, options?: C): Promise<CurrentUserAuthenticationsQuery> {
      return requester<CurrentUserAuthenticationsQuery, CurrentUserAuthenticationsQueryVariables>(CurrentUserAuthenticationsDocument, variables, options) as Promise<CurrentUserAuthenticationsQuery>;
    },
    CurrentUserUpdated(variables?: CurrentUserUpdatedSubscriptionVariables, options?: C): AsyncIterable<CurrentUserUpdatedSubscription> {
      return requester<CurrentUserUpdatedSubscription, CurrentUserUpdatedSubscriptionVariables>(CurrentUserUpdatedDocument, variables, options) as AsyncIterable<CurrentUserUpdatedSubscription>;
    },
    DeleteEmail(variables: DeleteEmailMutationVariables, options?: C): Promise<DeleteEmailMutation> {
      return requester<DeleteEmailMutation, DeleteEmailMutationVariables>(DeleteEmailDocument, variables, options) as Promise<DeleteEmailMutation>;
    },
    DeleteOrganization(variables: DeleteOrganizationMutationVariables, options?: C): Promise<DeleteOrganizationMutation> {
      return requester<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, variables, options) as Promise<DeleteOrganizationMutation>;
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, options?: C): Promise<ForgotPasswordMutation> {
      return requester<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, variables, options) as Promise<ForgotPasswordMutation>;
    },
    InvitationDetail(variables: InvitationDetailQueryVariables, options?: C): Promise<InvitationDetailQuery> {
      return requester<InvitationDetailQuery, InvitationDetailQueryVariables>(InvitationDetailDocument, variables, options) as Promise<InvitationDetailQuery>;
    },
    InviteToOrganization(variables: InviteToOrganizationMutationVariables, options?: C): Promise<InviteToOrganizationMutation> {
      return requester<InviteToOrganizationMutation, InviteToOrganizationMutationVariables>(InviteToOrganizationDocument, variables, options) as Promise<InviteToOrganizationMutation>;
    },
    Login(variables: LoginMutationVariables, options?: C): Promise<LoginMutation> {
      return requester<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options) as Promise<LoginMutation>;
    },
    Logout(variables?: LogoutMutationVariables, options?: C): Promise<LogoutMutation> {
      return requester<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options) as Promise<LogoutMutation>;
    },
    MakeEmailPrimary(variables: MakeEmailPrimaryMutationVariables, options?: C): Promise<MakeEmailPrimaryMutation> {
      return requester<MakeEmailPrimaryMutation, MakeEmailPrimaryMutationVariables>(MakeEmailPrimaryDocument, variables, options) as Promise<MakeEmailPrimaryMutation>;
    },
    OrganizationBySlug(variables: OrganizationBySlugQueryVariables, options?: C): Promise<OrganizationBySlugQuery> {
      return requester<OrganizationBySlugQuery, OrganizationBySlugQueryVariables>(OrganizationBySlugDocument, variables, options) as Promise<OrganizationBySlugQuery>;
    },
    OrganizationMembers(variables: OrganizationMembersQueryVariables, options?: C): Promise<OrganizationMembersQuery> {
      return requester<OrganizationMembersQuery, OrganizationMembersQueryVariables>(OrganizationMembersDocument, variables, options) as Promise<OrganizationMembersQuery>;
    },
    OrganizationPage(variables: OrganizationPageQueryVariables, options?: C): Promise<OrganizationPageQuery> {
      return requester<OrganizationPageQuery, OrganizationPageQueryVariables>(OrganizationPageDocument, variables, options) as Promise<OrganizationPageQuery>;
    },
    Register(variables: RegisterMutationVariables, options?: C): Promise<RegisterMutation> {
      return requester<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables, options) as Promise<RegisterMutation>;
    },
    RemoveFromOrganization(variables: RemoveFromOrganizationMutationVariables, options?: C): Promise<RemoveFromOrganizationMutation> {
      return requester<RemoveFromOrganizationMutation, RemoveFromOrganizationMutationVariables>(RemoveFromOrganizationDocument, variables, options) as Promise<RemoveFromOrganizationMutation>;
    },
    RequestAccountDeletion(variables?: RequestAccountDeletionMutationVariables, options?: C): Promise<RequestAccountDeletionMutation> {
      return requester<RequestAccountDeletionMutation, RequestAccountDeletionMutationVariables>(RequestAccountDeletionDocument, variables, options) as Promise<RequestAccountDeletionMutation>;
    },
    ResendEmailVerification(variables: ResendEmailVerificationMutationVariables, options?: C): Promise<ResendEmailVerificationMutation> {
      return requester<ResendEmailVerificationMutation, ResendEmailVerificationMutationVariables>(ResendEmailVerificationDocument, variables, options) as Promise<ResendEmailVerificationMutation>;
    },
    ResetPassword(variables: ResetPasswordMutationVariables, options?: C): Promise<ResetPasswordMutation> {
      return requester<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables, options) as Promise<ResetPasswordMutation>;
    },
    SettingsEmails(variables?: SettingsEmailsQueryVariables, options?: C): Promise<SettingsEmailsQuery> {
      return requester<SettingsEmailsQuery, SettingsEmailsQueryVariables>(SettingsEmailsDocument, variables, options) as Promise<SettingsEmailsQuery>;
    },
    SettingsPassword(variables?: SettingsPasswordQueryVariables, options?: C): Promise<SettingsPasswordQuery> {
      return requester<SettingsPasswordQuery, SettingsPasswordQueryVariables>(SettingsPasswordDocument, variables, options) as Promise<SettingsPasswordQuery>;
    },
    SettingsProfile(variables?: SettingsProfileQueryVariables, options?: C): Promise<SettingsProfileQuery> {
      return requester<SettingsProfileQuery, SettingsProfileQueryVariables>(SettingsProfileDocument, variables, options) as Promise<SettingsProfileQuery>;
    },
    Shared(variables?: SharedQueryVariables, options?: C): Promise<SharedQuery> {
      return requester<SharedQuery, SharedQueryVariables>(SharedDocument, variables, options) as Promise<SharedQuery>;
    },
    TransferOrganizationBillingContact(variables: TransferOrganizationBillingContactMutationVariables, options?: C): Promise<TransferOrganizationBillingContactMutation> {
      return requester<TransferOrganizationBillingContactMutation, TransferOrganizationBillingContactMutationVariables>(TransferOrganizationBillingContactDocument, variables, options) as Promise<TransferOrganizationBillingContactMutation>;
    },
    TransferOrganizationOwnership(variables: TransferOrganizationOwnershipMutationVariables, options?: C): Promise<TransferOrganizationOwnershipMutation> {
      return requester<TransferOrganizationOwnershipMutation, TransferOrganizationOwnershipMutationVariables>(TransferOrganizationOwnershipDocument, variables, options) as Promise<TransferOrganizationOwnershipMutation>;
    },
    UnlinkUserAuthentication(variables: UnlinkUserAuthenticationMutationVariables, options?: C): Promise<UnlinkUserAuthenticationMutation> {
      return requester<UnlinkUserAuthenticationMutation, UnlinkUserAuthenticationMutationVariables>(UnlinkUserAuthenticationDocument, variables, options) as Promise<UnlinkUserAuthenticationMutation>;
    },
    UpdateOrganization(variables: UpdateOrganizationMutationVariables, options?: C): Promise<UpdateOrganizationMutation> {
      return requester<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, variables, options) as Promise<UpdateOrganizationMutation>;
    },
    UpdateUser(variables: UpdateUserMutationVariables, options?: C): Promise<UpdateUserMutation> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options) as Promise<UpdateUserMutation>;
    },
    VerifyEmail(variables: VerifyEmailMutationVariables, options?: C): Promise<VerifyEmailMutation> {
      return requester<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, variables, options) as Promise<VerifyEmailMutation>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;