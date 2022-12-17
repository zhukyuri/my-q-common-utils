import { colorHSL } from "../index";


describe('test', function () {

  test('Find By Id', async () => {
    colorHSL(10)
    expect(colorHSL(10)).toEqual("#fff");
  });

});
