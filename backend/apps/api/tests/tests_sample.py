def inc(x: int) -> int:
    return x + 1


# def test_inc_fail():
# assert inc(3) == 5


def test_inc_pass() -> None:
    assert inc(4) == 5
