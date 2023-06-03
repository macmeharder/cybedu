import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import { changeViewerFormSubmitted } from "~/pages/profile-settings/model.tsx";

import { IChangeViewerParams } from "~/entities/viewer/api.ts";
import { $viewer } from "~/entities/viewer/model.ts";

import { Input } from "~/shared/ui/input";

export function ProfileSettingsPage() {
  const { viewer, changeViewerFormSubmittedFn } = useUnit({
    viewer: $viewer,
    changeViewerFormSubmittedFn: changeViewerFormSubmitted,
  });

  const { register, handleSubmit } = useForm<IChangeViewerParams>();

  return (
    <div className="flex h-full flex-col gap-10 pt-safe">
      <form
        className="flex flex-col gap-4"
        id="profile-settings"
        onSubmit={handleSubmit(changeViewerFormSubmittedFn)}
      >
        <Input
          label="Имя"
          register={register("first_name", { value: viewer?.first_name })}
        />
        <Input
          label="Фамилия"
          register={register("last_name", { value: viewer?.last_name })}
        />
        <Input
          type="email"
          label="E-mail"
          defaultValue={viewer?.email}
          disabled
        />
      </form>
    </div>
  );
}
