import { TestBed } from '@angular/core/testing';

import { AuthUserPageGuardGuard } from './auth-user-page-guard.guard';

describe('AuthUserPageGuardGuard', () => {
  let guard: AuthUserPageGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthUserPageGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
