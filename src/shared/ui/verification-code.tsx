const KEYBOARDS = {
  backspace: 8,
  arrowLeft: 37,
  arrowRight: 39,
};

function handleInput(e: any) {
  const input = e.target;
  const nextInput = input.nextElementSibling;
  if (nextInput && input.value) {
    nextInput.focus();
    if (nextInput.value) {
      nextInput.select();
    }
  }
}

function handlePaste(e: any) {
  e.preventDefault();
  const paste = e.clipboardData.getData("text");
  const inputs = e.currentTarget.querySelectorAll("input");

  inputs.forEach((input: any, i: number) => {
    input.value = paste[i] || "";
  });

  inputs[inputs.length - 1].focus();
}

function handleBackspace(e: any) {
  const input = e.target;
  if (input.value) {
    input.value = "";
    return;
  }
  if (input.previousElementSibling) input.previousElementSibling.focus();
}

function handleArrowLeft(e: any) {
  const previousInput = e.target.previousElementSibling;
  if (!previousInput) return;
  previousInput.focus();
}

function handleArrowRight(e: any) {
  const nextInput = e.target.nextElementSibling;
  if (!nextInput) return;
  nextInput.focus();
}

function handleKeyDown(e: any) {
  switch (e.keyCode) {
    case KEYBOARDS.backspace:
      handleBackspace(e);
      break;
    case KEYBOARDS.arrowLeft:
      handleArrowLeft(e);
      break;
    case KEYBOARDS.arrowRight:
      handleArrowRight(e);
      break;
    default:
  }
}

export function VerificationCode({
  length,
  onSubmit,
}: {
  length: number;
  onSubmit: Function;
}) {
  function handleChange(e: any) {
    const inputs = Array.from(e.currentTarget.elements);
    const haveEmpty = inputs.some(function (input: any) {
      return input.value === "";
    });

    if (!haveEmpty) {
      const code = inputs.reduce(function (accumulator: string, input: any) {
        return accumulator + input.value;
      }, "");
      onSubmit(code);
    }
  }
  return (
    <form
      onInput={handleInput}
      onPaste={handlePaste}
      onChange={handleChange}
      className="flex items-center gap-9"
    >
      {new Array(length).fill(null).map(function (_, index) {
        return (
          <input
            className="h-14 w-14 rounded-xl border-none bg-ce-gray text-center"
            key={index}
            type="tel"
            placeholder="-"
            maxLength={1}
            pattern="[0-9]"
            onKeyDown={handleKeyDown}
          />
        );
      })}
    </form>
  );
}
