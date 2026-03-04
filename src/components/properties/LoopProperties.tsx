import { PropertyPanelProps, PropertyField, SelectInput, NumberInput, VariableInputField, TextInput, SwitchInput } from './types';

export default function LoopProperties({ data, onChange, availableVariables }: PropertyPanelProps) {
  return (
    <div className="space-y-4">
      <PropertyField label="循环类型">
        <SelectInput
          value={data.loopType || 'array'}
          onChange={(v) => onChange('loopType', v)}
          options={[
            { value: 'array', label: '数组遍历' },
            { value: 'count', label: '固定次数' },
            { value: 'condition', label: '条件循环' },
          ]}
        />
      </PropertyField>

      {data.loopType === 'array' && (
        <>
          <PropertyField label="数组变量" hint="要遍历的数组变量名">
            <VariableInputField
              value={data.arrayVariable || ''}
              onChange={(v) => onChange('arrayVariable', v)}
              variables={availableVariables}
              placeholder="items"
            />
          </PropertyField>

          <div className="grid grid-cols-2 gap-4">
            <PropertyField label="元素变量名" hint="当前循环元素的变量名">
              <TextInput
                value={data.itemVariable || 'item'}
                onChange={(v) => onChange('itemVariable', v)}
                placeholder="item"
              />
            </PropertyField>
            <PropertyField label="索引变量名" hint="当前索引的变量名">
              <TextInput
                value={data.indexVariable || 'index'}
                onChange={(v) => onChange('indexVariable', v)}
                placeholder="index"
              />
            </PropertyField>
          </div>
        </>
      )}

      {data.loopType === 'count' && (
        <PropertyField label="循环次数">
          <NumberInput
            value={data.maxIterations || 5}
            onChange={(v) => onChange('maxIterations', v)}
            min={1}
            max={1000}
          />
        </PropertyField>
      )}

      {data.loopType === 'condition' && (
        <PropertyField label="循环条件" hint="条件为真时继续循环">
          <VariableInputField
            value={data.condition || ''}
            onChange={(v) => onChange('condition', v)}
            variables={availableVariables}
            placeholder="{{count}} < 10"
            multiline
          />
        </PropertyField>
      )}

      <PropertyField label="最大迭代次数" hint="防止无限循环的安全限制">
        <NumberInput
          value={data.maxIterations || 100}
          onChange={(v) => onChange('maxIterations', v)}
          min={1}
        />
      </PropertyField>
    </div>
  );
}