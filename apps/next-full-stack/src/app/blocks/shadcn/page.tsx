import { FieldSeparator } from '@monorepo-starter/ui/components/field';
import { AppearanceSettings } from './_components/appearance-settings';
import { ButtonGroupDemo } from './_components/button-group-demo';
import { ButtonGroupInputGroup } from './_components/button-group-input-group';
import { ButtonGroupNested } from './_components/button-group-nested';
import { ButtonGroupPopover } from './_components/button-group-popover';
import { EmptyAvatarGroup } from './_components/empty-avatar-group';
import { FieldCheckbox } from './_components/field-checkbox';
import { FieldDemo } from './_components/field-demo';
import { FieldHear } from './_components/field-hear';
import { FieldSlider } from './_components/field-slider';
import { InputGroupButtonExample } from './_components/input-group-button';
import { InputGroupDemo } from './_components/input-group-demo';
import { ItemDemo } from './_components/item-demo';
import { NotionPromptForm } from './_components/notion-prompt-form';
import { SpinnerBadge } from './_components/spinner-badge';
import { SpinnerEmpty } from './_components/spinner-empty';

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col p-8">
      <div className="container-wrapper section-soft flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="theme-container hidden md:block">
            <div className="theme-container mx-auto grid gap-8 py-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
              <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
                <FieldDemo />
              </div>
              <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
                <EmptyAvatarGroup />
                <SpinnerBadge />
                <ButtonGroupInputGroup />
                <FieldSlider />
                <InputGroupDemo />
              </div>
              <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
                <InputGroupButtonExample />
                <ItemDemo />
                <FieldSeparator className="my-4">Appearance Settings</FieldSeparator>
                <AppearanceSettings />
              </div>
              <div className="order-first flex flex-col gap-6 lg:hidden xl:order-last xl:flex *:[div]:w-full *:[div]:max-w-full">
                <NotionPromptForm />
                <ButtonGroupDemo />
                <FieldCheckbox />
                <div className="flex justify-between gap-4">
                  <ButtonGroupNested />
                  <ButtonGroupPopover />
                </div>
                <FieldHear />
                <SpinnerEmpty />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
