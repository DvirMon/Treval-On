import { TestBed } from "@angular/core/testing";
import { FavoriteHttpService } from "./favorite.https.ervice";

describe("FavoriteService", () => {
  let service: FavoriteHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
