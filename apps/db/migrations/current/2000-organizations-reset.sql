/*
 * The organizations functionality in Starter is modelled in a way that would
 * be typically useful for a B2B SaaS project: the organization can have
 * multiple members, one of which is the "owner", one is the "billing contact"
 * and the others are just regular members (though you can of course add
 * additional tiers by adding columns to the `organization_memberships` table).
 *
 * This file drops all the organizations functionality, but it's unnecessary
 * because `0001-reset.sql` has already done all that; we just include it
 * because you might want to separate the organizations functionality into a
 * separate migration, and this makes iteration faster.
 */
drop function if exists publ.transfer_organization_billing_contact(uuid, uuid);
drop function if exists publ.transfer_organization_ownership(uuid, uuid);
drop function if exists publ.delete_organization(uuid);
drop function if exists publ.remove_from_organization(uuid, uuid);
drop function if exists publ.organizations_current_user_is_billing_contact(publ.organizations);
drop function if exists publ.organizations_current_user_is_owner(publ.organizations);
drop function if exists publ.accept_invitation_to_organization(uuid, text) cascade;
drop function if exists publ.get_organization_for_invitation(uuid, text) cascade;
drop function if exists publ.organization_for_invitation(uuid, text) cascade;
drop function if exists publ.invite_user_to_organization(uuid, uuid) cascade;
drop function if exists publ.invite_to_organization(uuid, citext, citext) cascade;
drop function if exists publ.current_user_invited_organization_ids() cascade;
drop function if exists publ.current_user_member_organization_ids() cascade;
drop table if exists publ.organization_invitations;
drop table if exists publ.organization_memberships;
drop table if exists publ.organizations cascade;
