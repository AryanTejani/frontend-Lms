import { passwordRules } from '../../schemas';
import type { PasswordValidationState, PasswordRuleId } from '../../types';
import { CheckCircleOutlineIcon } from '@/assets/icons';

interface PasswordChecklistProps {
  validation: PasswordValidationState;
}

export function PasswordChecklist({ validation }: PasswordChecklistProps) {
  return (
    <div className="flex flex-col gap-(--space-xs)">
      <span className="body-4-regular text-(--color-text-secondary)">Create a password that:</span>
      <ul className="list-none m-0 p-0 flex flex-col gap-(--space-xs2)">
        {passwordRules.map((rule) => {
          const isValid = validation[rule.id as PasswordRuleId];
          return (
            <li key={rule.id} className="flex items-center gap-(--space-xs)">
              <CheckCircleOutlineIcon
                className={`icon-sm shrink-0 transition-colors ${
                  isValid ? 'text-(--color-text-success)' : 'text-(--color-text-tertiary)'
                }`}
              />
              <span className="body-4-regular">{rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
